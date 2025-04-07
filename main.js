const makeDiv = (className)=> {
    const div = document.createElement('div')

    div.className
    return div
}

const divcontainer = makeDiv('container')

document.body.appendChild(divcontainer)

const divtable = makeDiv('table')

divcontainer.appendChild(divtable)

const divform = document.makeDiv('form')

divcontainer.appendChild(divform)