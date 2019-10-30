var themes = ["light", "dark", "frozen"];
var curr_theme_index = 1
document.querySelector("#theme-svg").addEventListener('click', rotate_theme)

function rotate_theme () {
  console.log("fired")
  let prev_theme_index = curr_theme_index
  if (curr_theme_index === 2) curr_theme_index = 0
  else curr_theme_index += 1

  document.querySelector("#body").classList.replace(themes[prev_theme_index], themes[curr_theme_index])
}
