type Props = {
  head: string;
  body: string;
  tail: string;
};

export function composeFetchUrl({ head, body, tail }: Props) {
  return [head.trim(), body.trim(), tail.trim()].join("");
}
