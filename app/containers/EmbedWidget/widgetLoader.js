import iFrameResize from 'iframe-resizer/src/iframeResizer'

var GetDataAttributes = function (element) {
  var data = {}

  for (var i = element.attributes.length - 1; i >= 0; i--) {
    var attr = element.attributes[i]
    if (/^data/.test(attr.name)) {
      data[attr.name.substr(5)] = attr.value
    }
  }

  return data
}

window.onload = function () {
  const elementList = document.querySelectorAll('.embed-widget')

  for (var i = 0; i < elementList.length; i++) {
    var dataAttr = GetDataAttributes(elementList[i])
    let link = dataAttr.url

    var iframe = document.createElement('iframe')
    iframe.frameBorder = 0
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.className = 'w-iframe'
    iframe.setAttribute('src', link)
    document.getElementsByClassName('embed-widget')[i].appendChild(iframe)
    iFrameResize({checkOrigin: false, scrolling: true}, '.w-iframe')
  }
}
