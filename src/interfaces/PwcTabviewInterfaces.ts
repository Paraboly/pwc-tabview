// tslint:disable-next-line: no-namespace
export namespace PwcTabviewInterfaces {
  export interface IHandleClickedEventPayload {
    originalEvent: MouseEvent;
    handleRef: HTMLPwcTabviewHandleElement;
    handle: string;
  }

  export interface ITabChangedEventPayload {
    handle: string;
    tabRef: HTMLPwcTabviewTabElement;
    handleRef: HTMLPwcTabviewHandleElement;
  }
}
