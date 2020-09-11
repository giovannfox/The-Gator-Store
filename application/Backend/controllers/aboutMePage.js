const express = require('express');
const path = require('path')

const cb = (req, res, next) => {
    return express.static(path.join(__dirname, "../../Frontend/About-individual-pages"));
}

module.exports = cb