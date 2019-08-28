import React from 'react'
import MainContainer from '../containers/MainContainer'
import { renderWithProvider, fireEvent } from '../test-utils/client-test-utils'
import axiosMock from 'axios'
import pretty from 'pretty'
import store from '../store/store'
import mockDb from '../__mocks__/dbMock'
import * as createShoutOutWikipedia from '../lib/createShoutOuts'

jest.spyOn(axiosMock, 'get')
jest.spyOn(axiosMock, 'put')

axiosMock.get.mockImplementation(() => {
    return Promise.resolve({
        data: mockDb.get()
    })
})

const addedShoutout = {
    timespot: 1150,
    img: 'mock img',
    link: 'https://en.wikipedia.org/wiki/Africa',
    short: 'mock short',
    title: 'Africa'
}

axiosMock.put.mockImplementation((path, params) => {
    mockDb.addShoutout({
        timespot: params.shoutoutTime,
        img: addedShoutout.img,
        link: params.src,
        short: addedShoutout.short,
        title: params.title
    })
    return Promise.resolve({ status: 200 })
})

jest.spyOn(createShoutOutWikipedia, 'default')

jest.mock('react-css-modules', () => Component => Component)

describe('Integration Tests', () => {
    let utils,
        Main,
        List,
        Form,
        ShoutOuts,
        Audio,
        Player,
        Slider,
        SmallIcons,
        BigIcon,
        FlipButton,
        sliderHandle,
        sliderBar,
        AudioElement,
        PlayPauseButton,
        FastForwardButton,
        RewindButton,
        WikipediaInput,
        WikipediaSubmit

    beforeEach(async () => {
        jest.clearAllMocks()
        mockDb.reset()
        utils = renderWithProvider(<MainContainer />)
        await utils.finishLoading()
        AudioElement = utils.getByTestId('audio-element')
        AudioElement.duration = 2621.679
        fireEvent(AudioElement, new Event('durationchange'))
        fireEvent(AudioElement, new Event('timeupdate'))
        Main = utils.getByTestId('main-component')
        List = utils.getByTestId('list-component')
        Form = utils.getByTestId('form-component')
        ShoutOuts = utils.queryAllByTestId('shoutout-component')
        Audio = utils.getByTestId('audio-component')
        Player = utils.getByTestId('player-component')
        Slider = utils.getByTestId('slider-component')
        SmallIcons = utils.getAllByTestId('small-icon-component')
        BigIcon = utils.queryByTestId('big-icon-component')
        FlipButton = utils.queryByTestId('flipper')
        PlayPauseButton = utils.queryByTestId('play-pause-button')
        FastForwardButton = utils.queryByTestId('fast-forward-button')
        RewindButton = utils.queryByTestId('rewind-button')
        sliderHandle = utils.queryByTestId('slider-handle')
        sliderBar = utils.queryByTestId('slider-bar')
        WikipediaInput = utils.getByTestId('wikipedia-input')
        WikipediaSubmit = utils.getByTestId('wikipedia-submit')
    })

    describe('Main Component', () => {
        test('it should exist', async () => {
            expect(Main).toBeTruthy()
        })
    })

    describe('List Component', () => {
        test('it should exist', () => {
            expect(List).toBeTruthy()
        })
    })

    describe('Form Component', () => {
        test('it should exist', () => {
            expect(Form).toBeTruthy()
        })

        describe('wikipedia shoutout submit', () => {
            test('it should add shoutout', async () => {
                //inital time change
                fireEvent.change(AudioElement, {
                    target: {
                        currentTime: 1150
                    }
                })
                fireEvent(AudioElement, new Event('timeupdate'))
                //test icons for 1150 timespot
                SmallIcons = utils.getAllByTestId('small-icon-component')
                expect(SmallIcons.length).toEqual(1)
                // test shoutouts for 1150 timespot
                ShoutOuts = utils.queryAllByTestId('shoutout-component')
                expect(ShoutOuts.length).toEqual(2)
                // fire add shoutout events
                fireEvent.change(WikipediaInput, {
                    target: {
                        value: 'https://en.wikipedia.org/wiki/Africa'
                    }
                })

                fireEvent.click(WikipediaSubmit)
                await utils.finishLoading()
                // fire time update event
                fireEvent(AudioElement, new Event('timeupdate'))
                // test new icons
                SmallIcons = utils.getAllByTestId('small-icon-component')
                expect(SmallIcons.length).toEqual(2)
                // test appropriate methods called
                expect(createShoutOutWikipedia['default']).toHaveBeenCalled()
                // test new shoutouts
                ShoutOuts = utils.queryAllByTestId('shoutout-component')
                expect(ShoutOuts.length).toEqual(3)
                const newShoutout = ShoutOuts[2]
                expect(newShoutout.textContent).toMatch(addedShoutout.title)
                expect(newShoutout.textContent).toMatch(addedShoutout.short)
                expect(newShoutout.innerHTML).toMatch(addedShoutout.link)
            })
        })
    })

    describe('ShoutOut Components', () => {
        test('it should not exist on load', () => {
            expect(ShoutOuts.length).toBe(0)
        })

        test('shoutouts should render after timespot passed by audio player', async () => {
            fireEvent.change(AudioElement, {
                target: {
                    currentTime: 1150
                }
            })
            fireEvent(AudioElement, new Event('timeupdate'))
            ShoutOuts = utils.queryAllByTestId('shoutout-component')

            expect(ShoutOuts.length).toBe(2)
        })

        test('shoutouts should render correct content', () => {
            const [defaultData1, defaultData2] = JSON.parse(
                mockDb.get()[0].shoutouts
            )
            fireEvent.change(AudioElement, {
                target: {
                    currentTime: 1150
                }
            })
            fireEvent(AudioElement, new Event('timeupdate'))
            const [ShoutOut1, ShoutOut2] = utils.queryAllByTestId(
                'shoutout-component'
            )

            expect(ShoutOut1.textContent).toMatch(defaultData1.title)
            expect(ShoutOut1.textContent).toMatch(defaultData1.short)
            expect(ShoutOut1.innerHTML).toMatch(defaultData1.link)

            expect(ShoutOut2.textContent).toMatch(defaultData2.title)
            expect(ShoutOut2.textContent).toMatch(defaultData2.short)
            expect(ShoutOut2.innerHTML).toMatch(defaultData2.link)
        })
    })

    describe('Audio Component', () => {
        test('it should exist', () => {
            expect(Audio).toBeTruthy()
        })
    })

    describe('Player Component', () => {
        test('it should exist', () => {
            expect(Player).toBeTruthy()
        })

        test('it should be paused on load', () => {
            expect(AudioElement.paused).toBeTruthy()
            expect(PlayPauseButton.outerHTML).toMatch('play')
        })

        test('play button should cause audio element to play', () => {
            fireEvent.click(PlayPauseButton)
            expect(AudioElement.paused).toBeFalsy()
            expect(PlayPauseButton.outerHTML).toMatch('pause')
        })

        test('pause button should cause audio element to pause', () => {
            fireEvent.click(PlayPauseButton)
            fireEvent.click(PlayPauseButton)
            expect(AudioElement.paused).toBeTruthy()
            expect(PlayPauseButton.outerHTML).toMatch('play')
        })

        test('fast forward button should cause audio element to skip ahead', () => {
            fireEvent.click(FastForwardButton)
            expect(AudioElement.currentTime).toEqual(30)
        })

        test('rewind button should cause audio element to skip backwards', () => {
            fireEvent.click(FastForwardButton)
            fireEvent.click(RewindButton)
            expect(AudioElement.currentTime).toEqual(0)
        })

        test('flipper should work', () => {
            const frontSide = Main.querySelector('.react-card-front')
            const backSide = Main.querySelector('.react-card-back')
            expect(frontSide).toHaveAttribute(
                'style',
                'left: 0px; position: absolute; top: 0px; transform: rotateY(0deg); width: 100%; z-index: 2; transition: 0.6s;'
            )
            expect(backSide).toHaveAttribute(
                'style',
                'left: 0px; position: absolute; transform: rotateY(180deg); top: 0px; width: 100%; transition: 0.6s;'
            )

            fireEvent.click(FlipButton)

            expect(frontSide).toHaveAttribute(
                'style',
                'left: 0px; position: absolute; top: 0px; transform: rotateY(180deg); width: 100%; z-index: 2; transition: 0.6s;'
            )
            expect(backSide).toHaveAttribute(
                'style',
                'left: 0px; position: absolute; transform: rotateY(360deg); top: 0px; width: 100%; transition: 0.6s;'
            )
        })
    })

    describe('Slider Component', () => {
        test('it should exist', () => {
            expect(Slider).toBeTruthy()
        })

        test('dragging slider handle should update timespot of audio element', () => {
            const time1 = AudioElement.currentTime
            fireEvent.mouseDown(sliderHandle, {
                clientX: 28,
                clientY: 673
            })
            fireEvent.mouseMove(sliderHandle, {
                clientX: 255,
                clientY: 673
            })
            fireEvent.mouseUp(sliderHandle, {
                clientX: 255,
                clientY: 673
            })
            const time2 = AudioElement.currentTime

            expect(time1).not.toEqual(time2)
        })

        test.skip('clicking slider bar should update timespot of audio element', () => {
            const time1 = AudioElement.currentTime
            fireEvent.click(sliderBar, {
                clientX: 10,
                clientY: 100
            })
            const time2 = AudioElement.currentTime

            expect(time1).not.toEqual(time2)
        })
    })

    describe('SmallIcon Component', () => {
        test('They should exist on load', () => {
            expect(SmallIcons).toBeTruthy()
        })
    })

    describe('BigIcon Component', () => {
        test('it should not exist on load', () => {
            expect(BigIcon).toBeFalsy()
        })

        test('it should exist after given timespot passed', () => {
            fireEvent.change(AudioElement, {
                target: {
                    currentTime: 1150
                }
            })
            fireEvent(AudioElement, new Event('timeupdate'))
            BigIcon = utils.queryByTestId('big-icon-component')

            expect(BigIcon).toBeTruthy()
        })
    })
})
