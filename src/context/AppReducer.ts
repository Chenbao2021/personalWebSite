import { produce } from 'immer'

export interface IState {
	DrawerItemSelected?: string
	gameSelected?: number
}

export const initialState: IState = {
	DrawerItemSelected: 'Album',
	gameSelected: undefined,
}

export enum ActionEnum {
	setDrawerItem = 'setDrawerItem',
	setGameSelected = 'setGameSelected',
}

export type Action =
	| { type: ActionEnum.setDrawerItem; value?: string }
	| { type: ActionEnum.setGameSelected; value?: number }

export const AppReducer = produce((state: IState, action: Action) => {
	console.log('action.type', action.type)
	switch (action.type) {
		case ActionEnum.setDrawerItem: {
			state.DrawerItemSelected = action.value
			break
		}
		case ActionEnum.setGameSelected: {
			state.gameSelected = action.value
			break
		}
	}
	return state
})
