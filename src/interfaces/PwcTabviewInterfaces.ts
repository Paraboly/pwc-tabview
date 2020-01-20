// tslint:disable-next-line: no-namespace
export namespace PwcTabviewInterfaces {
  export interface IHandleClickedEventPayload {
    originalEvent: MouseEvent;
    handle: HTMLPwcTabviewHandleElement;
    tab: HTMLPwcTabviewTabElement;
  }

  export interface ITabChangedEventPayload {
    originalEvent: CustomEvent<PwcTabviewInterfaces.IHandleClickedEventPayload>;
    handle: string;
    handleRef: HTMLPwcTabviewHandleElement;
    tabRef: HTMLPwcTabviewTabElement;
  }
}
