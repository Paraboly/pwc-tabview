/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  ITabChangedEventPayload,
} from './components/pwc-tabview/ITabChangedEventPayload';
import {
  IHandleClickedEventPayload,
} from './components/pwc-tabview-handle/IHandleClickedEventPayload';

export namespace Components {
  interface PwcTabview {
    'getActiveState': () => Promise<{ handle: string; tabRef: HTMLPwcTabviewTabElement; handleRef: HTMLPwcTabviewHandleElement; }>;
    'switchToTab': (handle: string) => Promise<void>;
  }
  interface PwcTabviewHandle {
    'active': boolean;
    'handle': string;
  }
  interface PwcTabviewTab {
    'active': boolean;
    'handle': string;
  }
}

declare global {


  interface HTMLPwcTabviewElement extends Components.PwcTabview, HTMLStencilElement {}
  var HTMLPwcTabviewElement: {
    prototype: HTMLPwcTabviewElement;
    new (): HTMLPwcTabviewElement;
  };

  interface HTMLPwcTabviewHandleElement extends Components.PwcTabviewHandle, HTMLStencilElement {}
  var HTMLPwcTabviewHandleElement: {
    prototype: HTMLPwcTabviewHandleElement;
    new (): HTMLPwcTabviewHandleElement;
  };

  interface HTMLPwcTabviewTabElement extends Components.PwcTabviewTab, HTMLStencilElement {}
  var HTMLPwcTabviewTabElement: {
    prototype: HTMLPwcTabviewTabElement;
    new (): HTMLPwcTabviewTabElement;
  };
  interface HTMLElementTagNameMap {
    'pwc-tabview': HTMLPwcTabviewElement;
    'pwc-tabview-handle': HTMLPwcTabviewHandleElement;
    'pwc-tabview-tab': HTMLPwcTabviewTabElement;
  }
}

declare namespace LocalJSX {
  interface PwcTabview {
    'onTabChanged'?: (event: CustomEvent<ITabChangedEventPayload>) => void;
  }
  interface PwcTabviewHandle {
    'active'?: boolean;
    'handle'?: string;
    'onHandleClicked'?: (event: CustomEvent<IHandleClickedEventPayload>) => void;
  }
  interface PwcTabviewTab {
    'active'?: boolean;
    'handle'?: string;
    'onTabModified'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'pwc-tabview': PwcTabview;
    'pwc-tabview-handle': PwcTabviewHandle;
    'pwc-tabview-tab': PwcTabviewTab;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'pwc-tabview': LocalJSX.PwcTabview & JSXBase.HTMLAttributes<HTMLPwcTabviewElement>;
      'pwc-tabview-handle': LocalJSX.PwcTabviewHandle & JSXBase.HTMLAttributes<HTMLPwcTabviewHandleElement>;
      'pwc-tabview-tab': LocalJSX.PwcTabviewTab & JSXBase.HTMLAttributes<HTMLPwcTabviewTabElement>;
    }
  }
}


