/// <reference types="vite/client" />

declare module '*.svg?component-solid' {
  import { ComponentProps, JSX } from 'solid-js';
  const content: (props: ComponentProps<'svg'>) => JSX.Element;
  export default content;
}
