// @flow

export default (s: string, maxLength: number, end: string = "…"): string => {
  const trimmed = s.substr(0, maxLength)

  if (trimmed === s) {
    return s
  }

  return (
    trimmed.substr(
      0,
      Math.min(trimmed.length, trimmed.lastIndexOf(" "))
    )
    + end
  )
}
