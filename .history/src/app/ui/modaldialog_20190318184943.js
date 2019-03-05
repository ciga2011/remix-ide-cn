var yo = require('yo-yo')
var css = require('./styles/modaldialog-styles')

<<<<<<< HEAD
module.exports = (title, content, ok, cancel, focusSelector) => {
=======
module.exports = (title, content, ok, cancel, focusSelector, opts) => {
  let agreed = true
  opts = opts || {}
>>>>>>> 863b9543... added key-navigation to modaldialog
  var container = document.querySelector(`.${css.modal}`)
  if (!container) {
    document.querySelector('body').appendChild(html())
    container = document.querySelector(`.${css.modal}`)
  }

  var closeDiv = document.getElementById('modal-close')

  var okDiv = document.getElementById('modal-footer-ok')
  okDiv.innerHTML = (ok && ok.label !== undefined) ? ok.label : 'OK'

  var cancelDiv = document.getElementById('modal-footer-cancel')
  cancelDiv.innerHTML = (cancel && cancel.label !== undefined) ? cancel.label : 'Cancel'

  var modal = document.querySelector(`.${css.modalBody}`)
  var modalTitle = document.querySelector(`.${css.modalHeader} h2`)

  modalTitle.innerHTML = ''
  if (title) modalTitle.innerHTML = title

  modal.innerHTML = ''
  if (content) modal.appendChild(content)

  show()

  function setFocusOn (btn) {
    var okDiv = document.getElementById('modal-footer-ok')
    var cancelDiv = document.getElementById('modal-footer-cancel')
    if (btn === 'ok') {
      agreed = true
      okDiv.style.backgroundColor = 'var(--dark)'
      okDiv.style.color = 'var(--light)'
      cancelDiv.style.backgroundColor = 'var(--light)'
      cancelDiv.style.color = 'var(--dark)'
    } else {
      agreed = false
      okDiv.style.backgroundColor = 'var(--light)'
      okDiv.style.color = 'var(--dark)'
      cancelDiv.style.backgroundColor = 'var(--dark)'
      cancelDiv.style.color = 'var(--light)'
    }
  }

  function okListener () {
    removeEventListener()
    hide()
    if (ok && ok.fn && agreed) ok.fn()
  }

  function cancelListener () {
    removeEventListener()
    hide()
    if (cancel && cancel.fn) cancel.fn()
  }

  function modalKeyEvent (e) {
    if (e.keyCode === 27) {
      cancelListener()
    } else if (e.keyCode === 13) {
      e.preventDefault()
      okListener()
    } else if (e.keyCode === 37) {
      e.preventDefault()
      setFocusOn('ok')
    } else if (e.keyCode === 39) {
      e.preventDefault()
      setFocusOn('cancel')
    }
  }

  function hide () {
    container.style.display = 'none'
  }

  function show () {
    container.style.display = 'block'
    if (focusSelector) {
      const focusTarget = document.querySelector(`.${css.modal} ${focusSelector}`)
      if (focusTarget) {
        focusTarget.focus()
        if (typeof focusTarget.setSelectionRange === 'function') {
          focusTarget.setSelectionRange(0, focusTarget.value.length)
        }
      }
    }
  }

  function removeEventListener () {
    okDiv.removeEventListener('click', okListener)
    cancelDiv.removeEventListener('click', cancelListener)
    closeDiv.removeEventListener('click', cancelListener)
    document.removeEventListener('keydown', modalKeyEvent)
    document.getElementById('modal-background').removeEventListener('click', cancelListener)
  }
  okDiv.addEventListener('click', okListener)
  cancelDiv.addEventListener('click', cancelListener)
  closeDiv.addEventListener('click', cancelListener)
  document.addEventListener('keydown', modalKeyEvent)
  document.getElementById('modal-background').addEventListener('click', cancelListener)
}

function html () {
  return yo`<div id="modal-dialog" class="${css.modal}">
  <div id="modal-background" class="${css['modalBackground']}"> </div>
    <div class="${css['modalContent']} bg-light text-secondary ${opts.class}">
      <div class="${css['modalHeader']}">
        <h3></h3>
        <i id="modal-close" title="Close" class="fa fa-times ${css['modalClose']}" aria-hidden="true"></i>
      </div>
      <div class="${css['modalBody']}"> -
      </div>
      <div class="${css['modalFooter']}">
        <span id="modal-footer-ok" class="${css['modalFooterOk']} btn btn-sm btn-dark autofocus tabindex='1'">OK</span>
        <span id="modal-footer-cancel" class="${css['modalFooterCancel']} btn btn-sm btn-light tabindex='0'">Cancel</span>
      </div>
    </div>
  </div>`
}