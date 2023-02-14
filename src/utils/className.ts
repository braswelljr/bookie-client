export default function className(...args: any[]) {
  return args.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
}
