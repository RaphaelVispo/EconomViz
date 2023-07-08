
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                REACT_APP_LINEAR_REG_API: JSON.stringify(process.env.REACT_APP_LINEAR_REG_API),
            },
        }),
    ]
}
