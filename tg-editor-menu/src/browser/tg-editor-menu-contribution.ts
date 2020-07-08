import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry } from '@theia/core';
import { TerminalService } from "@theia/terminal/lib/browser/base/terminal-service";
import { inject, injectable } from 'inversify';

const mavenInstallCommand: Command = {
    id: 'install-maven-command',
    label: 'mvn clean install'
};

const gradleInstallCommand: Command = {
    id: 'install-gradle-command',
    label: 'gradle build'
};

const nodeInstallCommand: Command = {
    id: 'install-node-command',
    label: 'npm install'
};

const runMavenCommand: Command = {
    id: 'run-maven-command',
    label: 'mvn spring-boot:run'
};

const runGradleCommand: Command = {
    id: 'run-gradle-command',
    label: 'gradle bootRun'
};

const runNodeCommand: Command = {
    id: 'run-node-command',
    label: 'npm start'
};

const stopApplicationCommand: Command = {
    id: 'stop-app-command',
    label: 'stop running application'
};

@injectable()
export class MyTgEditorCommandsContribution implements CommandContribution {

    @inject(TerminalService) private readonly terminalService: TerminalService

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(
            mavenInstallCommand,
            {
                execute: async () => this.terminalService.newTerminal({
                    title: "Install Dependency"
                }).then(terminalWidget => {
                    terminalWidget.start().then(number => {
                        this.terminalService.activateTerminal(terminalWidget);
                         terminalWidget.sendText('mvn clean install\n');
                    })
                })
            });
            registry.registerCommand(
                gradleInstallCommand,
                {
                    execute: async () => this.terminalService.newTerminal({
                        title: "Install Dependency"
                    }).then(terminalWidget => {
                        terminalWidget.start().then(number => {
                            this.terminalService.activateTerminal(terminalWidget);
                            terminalWidget.sendText("gradle build --build-cache -x test --parallel\n");
                        })
                    })
                });
                registry.registerCommand(
                    nodeInstallCommand,
                    {
                        execute: async () => this.terminalService.newTerminal({
                            title: "Install Dependency"
                        }).then(terminalWidget => {
                            terminalWidget.start().then(number => {
                                this.terminalService.activateTerminal(terminalWidget);
                                terminalWidget.sendText('npm install\n');
                            })
                        })
                    });
                    registry.registerCommand(
                        runMavenCommand,
                        {
                            execute: async () => this.terminalService.newTerminal({
                                title: "Run Application"
                            }).then(terminalWidget => {
                                terminalWidget.start().then(number => {
                                    this.terminalService.activateTerminal(terminalWidget);
                                    terminalWidget.sendText("fuser -k 9090/tcp 2>/dev/null\n");
                                    terminalWidget.sendText("mvn spring-boot:run\n");
                                })
                            })
                        });
                        registry.registerCommand(
                            runGradleCommand,
                            {
                                execute: async () => this.terminalService.newTerminal({
                                    title: "Run Application"
                                }).then(terminalWidget => {
                                    terminalWidget.start().then(number => {
                                        this.terminalService.activateTerminal(terminalWidget);
                                        terminalWidget.sendText("fuser -k 9090/tcp 2>/dev/null\n");
                                        terminalWidget.sendText("gradle bootRun --parallel\n");
                                    })
                                })
                            });
                            registry.registerCommand(
                                runNodeCommand,
                                {
                                    execute: async () => this.terminalService.newTerminal({
                                        title: "Run Application"
                                    }).then(terminalWidget => {
                                        terminalWidget.start().then(number => {
                                            this.terminalService.activateTerminal(terminalWidget);
                                            terminalWidget.sendText("fuser -k 9090/tcp 2>/dev/null\n");
                                            terminalWidget.sendText('npm start\n');
                                        })
                                    })
                                });
                                registry.registerCommand(
                                    stopApplicationCommand,
                                    {
                                        execute: async () => this.terminalService.newTerminal({
                                            title: "Stopping Application"
                                        }).then(terminalWidget => {
                                            terminalWidget.start().then(number => {
                                                this.terminalService.activateTerminal(terminalWidget);
                                                terminalWidget.sendText("fuser -k 9090/tcp 2>/dev/null\n");
                                            })
                                        })
                                    });
    }
}

const MY_MAIN_MENU = [...MAIN_MENU_BAR, '6_mymenu'];

@injectable()
export class MyTgEditorMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {

        menus.registerSubmenu(MY_MAIN_MENU, 'Run');

        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: mavenInstallCommand.id,
            order: '0',
        });

        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: gradleInstallCommand.id,
            order: '1',
        });
        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: nodeInstallCommand.id,
            order: '2',
        });

        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: runMavenCommand.id,
            order: '3',
        });

        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: runGradleCommand.id,
            order: '4',
        });
        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: runNodeCommand.id,
            order: '5',
        });
        menus.registerMenuAction(MY_MAIN_MENU, {
            commandId: stopApplicationCommand.id,
            order: '6',
        });
    }
}
