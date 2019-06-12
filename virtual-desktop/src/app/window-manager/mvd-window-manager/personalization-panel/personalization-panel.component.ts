

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import { Component, Injector, HostListener } from '@angular/core';
import { WindowManagerService } from '../shared/window-manager.service';
import { DesktopPluginDefinitionImpl } from "../../../../app/plugin-manager/shared/desktop-plugin-definition";
import { DesktopComponent } from "../desktop/desktop.component";
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'rs-com-personalization-panel',
  templateUrl: './personalization-panel.component.html',
  styleUrls: ['./personalization-panel.component.css'],
  providers: [WindowManagerService]
})
export class PersonalizationComponent {
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    if (this.panelHover == false)
    {
      this.desktopComponent.hidePersonalizationPanel();
    }
  }
  private settingsWindowPluginDef: DesktopPluginDefinitionImpl;
  private pluginManager: MVDHosting.PluginManagerInterface;
  private panelHover: boolean;
  public applicationManager: MVDHosting.ApplicationManagerInterface;
  public LanguagesTitle: string;
   personalizationTools = [ /* The following code is commented out, as these host the prototype for future modules
                            of the Settings & Personalization app.
                          {
                            "title":"Keyboard Controls",
                            "imgSrc":"keyboard",
                           },
                           {
                            "title":"Date and Time",
                            "imgSrc":"calendar",
                           },
                           {
                            "title":"Display",
                            "imgSrc":"resolution",
                           },
                           {
                            "title":"Skins",
                            "imgSrc":"color_correction",
                           }, */
                           {
                            "title":this.translation.translate("Notes"),
                            "imgSrc":"notes",
                           },
                          /*  {
                            "title":"User Profile",
                            "imgSrc":"management",
                           },
                           {
                            "title":"Fonts",
                            "imgSrc":"font_color",
                           },
                           {
                            "title":"Sounds",
                            "imgSrc":"audio_volume_medium",
                           },
                           {
                            "title":"Printer",
                            "imgSrc":"printer",
                           } */
  ];

   constructor(
    private injector: Injector,
    private windowManager: WindowManagerService,
    private desktopComponent: DesktopComponent,
    private translation: TranslationService
  ) {
    this.pluginManager = this.injector.get(MVDHosting.Tokens.PluginManagerToken);
    this.applicationManager = this.injector.get(MVDHosting.Tokens.ApplicationManagerToken);
    this.LanguagesTitle = this.translation.translate("Languages");
   }
  
  ngOnInit(): void {
    this.pluginManager.findPluginDefinition("org.zowe.zlux.ng2desktop.settings").then(personalizationsPlugin => {
      const pluginImpl:DesktopPluginDefinitionImpl = personalizationsPlugin as DesktopPluginDefinitionImpl;
      this.settingsWindowPluginDef=pluginImpl;
    })
  }

  getAppPropertyInformation():any{
    return {"isPropertyWindow":false,
    "settingsToolName":this.settingsWindowPluginDef.defaultWindowTitle,
    "copyright":this.settingsWindowPluginDef.getCopyright(),
    "image":this.settingsWindowPluginDef.image
    };
  }

  openTool (tool:any) {
    console.log("Tool: " + tool);
    let propertyWindowID = this.windowManager.getWindow(this.settingsWindowPluginDef);
    if (propertyWindowID == null) {
      this.desktopComponent.hidePersonalizationPanel();
      this.applicationManager.spawnApplication(this.settingsWindowPluginDef, this.getAppPropertyInformation());
    } else {
      this.windowManager.showWindow(propertyWindowID);
    }
  }

  panelMouseEnter(): void {
    this.panelHover = true;
  }

  panelMouseLeave(): void {
    this.panelHover = false;
  }

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

}