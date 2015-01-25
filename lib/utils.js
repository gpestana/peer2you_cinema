function generateID() {
  return Math.random().toString(36).substring(12)
}

exports.generateID      = generateID
