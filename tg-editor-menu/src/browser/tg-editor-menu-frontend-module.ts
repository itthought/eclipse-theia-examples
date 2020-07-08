/**
 * Generated using theia-extension-generator
 */

import { CommandContribution, MenuContribution } from '@theia/core';
import { ContainerModule } from 'inversify';
import { MyTgEditorCommandsContribution, MyTgEditorMenuContribution } from './tg-editor-menu-contribution';

export default new ContainerModule(bind => {
    // bind menu entry and command to execute command on terminal
    bind(MenuContribution).to(MyTgEditorMenuContribution);
    bind(CommandContribution).to(MyTgEditorCommandsContribution);
});
