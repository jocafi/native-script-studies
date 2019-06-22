import { Component, OnInit, Input } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../../ui.service';

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id
})
export class ActionBarComponent implements OnInit {
  @Input() title: string;

  /**
   * .JA. showBackButton adds more control when to show the "Go Back" button.
   * Otherwise the App navigates from A (without a back button) to the page B.
   * When the user goes back to A, we can see the title on A jumping from right to the left
   * because the button was there and then was hidden lazily.
   *
   * NS Course - 84. Overwriting the Default Transition Effect 1:24 min shows the jump
   */
  @Input() showBackButton = true;

  /**
   * HasMenu prevents to show the Hamburger Menu on the Login page and other deep / called pages like the "edit page" for challenges.
   */
  @Input() hasMenu = true;

  constructor(
    private page: Page,
    private router: RouterExtensions,
    private uiService: UIService
  ) {}

  ngOnInit() {}

  get android() {
    return isAndroid;
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  onGoBack() {
    this.router.backToPreviousPage();
  }

  onLoadedActionBar() {
    if (isAndroid) {
      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();
      let color = '#171717';
      if (this.hasMenu) {
        color = '#ffffff';
      }
      if (backButton) {
        // android.graphics.Color.parseColor('#171717'),
        backButton.setColorFilter(
            android.graphics.Color.parseColor(color),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }

  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
