/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  IState,
} from './components/pwc-tabview/IState';
import {
  IHandleClickedEventPayload,
} from './components/pwc-tabview-handle/IHandleClickedEventPayload';

export namespace Components {
  interface PwcTabview {
    'activeTitle': string;
    /**
    * Returns the currently active tab, handle, and title.
    */
    'getActiveState': () => Promise<IState>;
    /**
    * Switches to a tab.
    * @param title Title of the target tab.
    */
    'switchToTab': (title: string) => Promise<void>;
    /**
    * Switches to a tab.
    * @param index Index of the target tab.
    */
    'switchToTabIndex': (index: number) => Promise<void>;
  }
  interface PwcTabviewHandle {
    'active': boolean;
    'title': string;
  }
  interface PwcTabviewTab {
    'active': boolean;
    'title': string;
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
    'activeTitle'?: string;
    /**
    * This is emitted when we switch to another tab.
    */
    'onTabChanged'?: (event: CustomEvent<IState>) => void;
  }
  interface PwcTabviewHandle {
    'active'?: boolean;
    'onHandleClicked'?: (event: CustomEvent<IHandleClickedEventPayload>) => void;
    'title'?: string;
  }
  interface PwcTabviewTab {
    'active'?: boolean;
    'onTabModified'?: (event: CustomEvent<any>) => void;
    'title'?: string;
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


