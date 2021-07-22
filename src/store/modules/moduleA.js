const state = {
	changeIndex: '/home/index',
	route: [],
	forum_route: [],
	hot_list: [],
	forum_hot_list:[],
	imgBaseURL:"http://182.92.131.179/",
	token:''
}

const getters = {
	changeIndex: (state) => state.changeIndex,
	route: (state) => state.route,
	forum_route: (state) => state.forum_route,
	hot_list: (state) => state.hot_list,
	forum_hot_list: (state) => state.forum_hot_list,
	token: (state) => state.token,
}

const mutations = {
	UPDATE_STATE(state, data) {
		state.changeIndex = data
	},
	UPDATE_ROUTE(state, data) {
		state.route = data
	},
	UPDATE_FORUM_ROUTE(state, data) {
		state.forum_route = data
	},
	UPDATE_HOTLIST(state, data) {
		state.hot_list = data
	},
	UPDATE_FORUM_HOTLIST(state, data) {
		state.forum_hot_list = data
	},
	UPDATE_TOKEN(state, data) {
		state.token = data
	},
}

const actions = {
	UPDATE_STATE_ASYN({commit}, data) {
		commit('UPDATE_STATE', data)
	},
	UPDATE_ROUTE_ASYN({commit}, data) {
		commit('UPDATE_ROUTE', data)
	},
	UPDATE_FORUM_ROUTE_ASYN({commit}, data) {
		commit('UPDATE_FORUM_ROUTE', data)
	},
	UPDATE_HOTLIST_ASYN({commit}, data) {
		commit('UPDATE_HOTLIST', data)
	},
	UPDATE_FORUM_HOTLIST_ASYN({commit}, data) {
		commit('UPDATE_FORUM_HOTLIST', data)
	},
	UPDATE_TOKEN_ASYN({commit}, data) {
		commit('UPDATE_TOKEN', data)
	}
}


export default {
	state,
	getters,
	mutations,
	actions
}
