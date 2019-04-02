// Replace playback rates
let interval = setInterval(()=> {
  let player = document.getElementById('podcast-audio-player')
  if(player) {

    clearInterval(interval)

    // Toggle play/pause with space key
    // ---------------------------------

    let attr = JSON.parse(player.getAttribute('data-setup'))
    attr.playbackRates = [0.7, 0.8, 1]
    player.setAttribute('data-setup', JSON.stringify(attr))
    document.addEventListener('keydown', (e)=> {
      if(e.keyCode==32) {
        e.preventDefault()
        document.querySelector('.vjs-play-control').click()
      }
    })

    // Colored Name
    // ------------
    const colors = ['74b49b', 'ff8b6a', '6b76ff', 'f9fd50', 'dd6b4d']
    let elements = document.querySelectorAll('strong')
    classnames = []
    elements.forEach((el)=> {
      const name = el.innerHTML.slice(0,-1) // remove ':'
      let mathes = name.match(/^(\S+)/i)
      let classname = mathes[1].toLowerCase()
      el.classList.add(classname)
      if(!classnames.includes(classname)) {
        classnames.push(classname)
      }
    })
    let sheets = ''
    classnames.forEach((name, idx)=> {
      sheets += `strong.${name} {color: #${colors[idx]}}\n`
    })
    let css = document.createTextNode(sheets)
    let style = document.createElement('style')
    style.appendChild(css)
    document.body.appendChild(style)
  }
}, 1)

let code = document.createTextNode(require('./injection.js'));
let script = document.createElement('script')
script.appendChild(code)
window.addEventListener('load', ()=> {
  document.body.appendChild(script);
})
