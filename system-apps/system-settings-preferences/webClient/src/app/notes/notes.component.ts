
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { Component, Inject, Optional } from '@angular/core';
import { Angular2InjectionTokens, Angular2PluginWindowActions } from 'pluginlib/inject-resources';
import { TranslationService } from 'angular-l10n';


@Component({
  selector: 'notes-component',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})

export class NotesComponent { 
  // private readonly logger: ZLUX.ComponentLogger = BaseLogger;
  public selectednotes: string;
  private idnotes: string;
  public isRestartWindowVisible: boolean;
  public isVeilVisible: boolean;

  // Strings used in UI
  public notess: string;
  public RestartDescr1: string;
  public RestartDescr2: string;
  public Apply: string;
  public notesSelected: string;
  public RestartNow: string;
  public RestartLater: string;
  public notesChanges: string;
  public Select: string;

  constructor(
    // private notesLocaleService: notesLocaleService,
    private translation: TranslationService,
    @Optional() @Inject(Angular2InjectionTokens.WINDOW_ACTIONS) private windowActions: Angular2PluginWindowActions,

  ) {
    this.isRestartWindowVisible = false;
    this.isVeilVisible = false;
    this.updatenotesSelection();
    this.updatenotesStrings();
    if (this.windowActions) {this.windowActions.setTitle(this.notess);}
  }

  applynotes(): void {
    // this.notesLocaleService.setnotes(this.idnotes).subscribe(
    //   arg => { 
    //     this.logger.debug(`setnotes, arg=`,arg);
    //     this.isRestartWindowVisible = true;
    //     this.isVeilVisible = true;
    //    },
    //   err => {
    //     this.logger.warn("setnotes error=",err);
    //   }
    // )
  }

  closeRestartWindow(): void {
    this.isRestartWindowVisible = false;
    this.isVeilVisible = false;
  }

  restartZowe(): void {
    window.location.reload();
  }

  //TODO: Ideally, when selecting a notes in the panel we would adjust the notes strings to the chosen
  //notes in real-time (contrary to restarting the desktop) but this doesn't work yet as this.translation
  //only loads translations for the currently loaded notes (that of which data is coming from a cookie)

  selectEnglish(): void {
    this.selectednotes = "English";
    this.selectednotes = this.translation.translate(this.selectednotes);
    this.idnotes = "en";
  }

  selectFrench(): void {
    this.selectednotes = "French";
    this.selectednotes = this.translation.translate(this.selectednotes);
    this.idnotes = "fr";
  }

  selectRussian(): void {
    this.selectednotes = "Russian";
    this.selectednotes = this.translation.translate(this.selectednotes);
    this.idnotes = "ru";
  }

  selectChinese(): void {
    this.selectednotes = "Chinese";
    this.selectednotes = this.translation.translate(this.selectednotes);
    this.idnotes = "zh";
  }

  selectJapanese(): void {
    this.selectednotes = "Japanese";
    this.selectednotes = this.translation.translate(this.selectednotes);
    this.idnotes = "ja";
  }

  selectGerman(): void {
    this.selectednotes = "German";
    this.selectednotes = this.translation.translate(this.selectednotes);
    this.idnotes = "de";
  }

  updatenotesSelection(): void {
    // this.idnotes = this.notesLocaleService.getnotes();

    switch(this.idnotes) {
      case "en": {
        this.selectEnglish();
        break;
      }
      case "fr": {
        this.selectFrench();
        break;
      }
      case "ja": {
        this.selectJapanese();
        break;
      }
      case "ru": {
        this.selectRussian();
        break;
      }
      case "zh": {
        this.selectChinese();
        break;
      }
      case "de": {
        this.selectGerman();
        break;
      }
      default: {
        this.selectEnglish();
        break;
      }
    }
  }

  updatenotesStrings(): void {
    this.selectednotes = this.translation.translate(this.selectednotes, null, this.idnotes+"-");
    this.notess = this.translation.translate('Notes', null, this.idnotes+"-");
    this.Apply = this.translation.translate('Apply', null, this.idnotes+"-");
    this.notesChanges = this.translation.translate('notes Changes', null, this.idnotes+"-");
    this.notesSelected = this.translation.translate('notes Selected', null, this.idnotes+"-");
    this.RestartDescr1 = this.translation.translate('For notes changes to take effect, Zowe must be restarted.', null, this.idnotes+"-");
    this.RestartDescr2 = this.translation.translate('Would you like to restart the desktop?', null, this.idnotes+"-");
    this.RestartLater = this.translation.translate('Restart Later', null, this.idnotes+"-");
    this.RestartNow = this.translation.translate('Restart Now', null, this.idnotes+"-");
    this.Select = this.translation.translate('Select', null, this.idnotes+"-");

  }

}
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
