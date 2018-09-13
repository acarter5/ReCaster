var getData = (id, callback) => {
  axios.get(`http://localhost:3000/episodes/${id}`)
    .then((res) => {
      const data = res.data.pop();

      callback(data);
      // self.setState({src: data.src});
      // self.setState({shoutOuts: JSON.parse(data.shoutouts)});
    })
    .catch((err) => {
      console.log(err);
      throw(err);
    })
}

export default getData;