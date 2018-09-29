
module.exports = {
    callback: (req, res) => {
        console.log(req)
        res.send('Got callback')
    }
}