import {ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {CdkScrollable} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('cdkScrollable') scrollable: CdkScrollable;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  mouseOver(e, snav) {
    snav.open();
  }

  mouseLeave(e, snav) {
    snav.close();
  }

  onClick(snav) {
    snav.close();
  }

  logout(snav) {
    snav.close();
    localStorage.removeItem('access_token');
  }

  isUserLogged() {
    const token = localStorage.getItem('access_token');
    if (token !== null && token !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  shouldRun = true;
}
