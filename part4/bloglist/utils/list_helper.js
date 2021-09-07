const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  )
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) =>
    prev.likes > current.likes
      ? { author: prev.author, likes: prev.likes, title: prev.title }
      : { author: current.author, likes: current.likes, title: current.title }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
