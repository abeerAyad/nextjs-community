import jwt from "jsonwebtoken"

const DEFAULT_SIGN_OPTION = {
  expiresIn: '1h'
}

export function signJwtAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
  console.log(payload)
  const secret_key = process.env.TOKEN_SECRET
  const token = jwt.sign(payload, secret_key, options)
  return token
}