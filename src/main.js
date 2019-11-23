var themes = ["light", "dark", "frozen"];
var curr_theme_index = 1
document.querySelector("#theme-svg").addEventListener('click', rotate_theme)

var theme_change = new Event('theme_change')

function rotate_theme () {
  let prev_theme_index = curr_theme_index
  if (curr_theme_index === 2) curr_theme_index = 0
  else curr_theme_index += 1

  document.querySelector("#body").classList.replace(themes[prev_theme_index], themes[curr_theme_index])

  let theme = curr_theme_index
  if (theme === 0) document.querySelector("#theme-svg").children[0].textContent = "Enable Dark mode"
  else if (theme === 1) document.querySelector("#theme-svg").children[0].textContent = "Enable Frozen theme"
  else if (theme === 2) document.querySelector("#theme-svg").children[0].textContent = "Enable light mode"
  else console.warn(`Didn't detect a theme index: ${theme}, from ${curr_theme_index}`)

  window.dispatchEvent(theme_change)
}
