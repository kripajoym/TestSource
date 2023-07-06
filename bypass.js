//Example#1: Unsafe
@Component({
  selector: 'my-app',
  template: `
    <div [innerHtml]="html"></div>
  `,
})


export class App {
  constructor() {
    this.html = "<h1>DomSanitizer</h1><script>attackerCode()</script>"
  }
}
 
//BypassHtml - still 
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  template: `
     <div [innerHtml]="html"></div>
  `,
}) 
export class App {
  constructor(private sanitizer: DomSanitizer) {
    this.html = sanitizer.bypassSecurityTrustHtml('<h1>DomSanitizer</h1><script>ourSafeCode()</script>') ;
  }
}

//Safe - use ng-bind - escapes all HTML 
<div>
<form>
<h1>AngularJS XSS Demo Test</h1>
<hr/>
<div class="col-md-12">
<input type="text" ng-model="name" class="form-control col-md-12" ng-change="processHtmlCode()" placeholder="Enter Some HTML Text..."/>
</div>
</form>
</div>
<hr/>
<div style="padding:20px">
<span><strong>ng-bind directive: Note that HTML text is entered as it is.</strong></span><br/>
<span ng-bind="helloMessage">{{helloMessage}}</span>
</div>

//Safe: use ng-bind-html
<div>
<form>
<h1>AngularJS XSS Demo Test</h1>
<hr/>
<div class="col-md-12">
<input type="text" ng-model="name" class="form-control col-md-12" ng-change="processHtmlCode()" placeholder="Enter Some HTML Text..."/>
</div>
</form>
</div>
<hr/>
<div style="padding:20px">
<span>ng-bind-html directive: Note that image is displayed appropriately as a result of text entered in the text field.</span>
<span ng-bind-html="helloMessage"></span>
</div>


//Example#2: Unsafe
@Component({
  selector: 'my-app',
  template: `
     <iframe [src]="iframe"></iframe>
  `,
})
export class App {
  constructor() {
    this.iframe = "https://www.google.com";
  }
}



//Bypass URL - still unsafe
@Component({
  selector: 'my-app',
  template: `
     <iframe [src]="iframe"></iframe>
  `,
})
export class App {
  constructor(private sanitizer: DomSanitizer) {
    this.iframe = sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com")
  }
}

// Unsafe
abstract class DomSanitizer implements Sanitizer {
  abstract sanitize(context: SecurityContext, value: SafeValue | string | null): string | null
  abstract bypassSecurityTrustHtml(value: string): SafeHtml
  abstract bypassSecurityTrustStyle(value: string): SafeStyle
  abstract bypassSecurityTrustScript(value: string): SafeScript
  abstract bypassSecurityTrustUrl(value: string): SafeUrl
  abstract bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl
  }

//Safe:
//calling these methods with untrusted user data exposes your application to XSS security risks!
/*sanitizes a value manually, maybe you need to work with third-party APIs that contain unsafe methods. You can use the sanitize method. The sanitize method takes the context (as enum) that can be one of:

SecurityContext.NONE
SecurityContext.HTML
SecurityContext.STYLE
SecurityContext.SCRIPT
SecurityContext.URL
SecurityContext.RESOURCE_URL
and the value to sanitize.*/

//Safe: manually sanitize
import {Component, SecurityContext} from '@angular/core'
export class App {
  constructor(private sanitizer: DomSanitizer) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, "<h1>Sanitize</h1><script>attackerCode()</script>");
  }
}

