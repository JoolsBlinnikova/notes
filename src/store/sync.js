const state = {
	etag: null,
	lastModified: 0,
	active: false,
	// TODO add list of notes with changes during sync
}

const getters = {
}

const mutations = {
	setSyncETag(state, etag) {
		state.etag = etag
	},

	setSyncLastModified(state, lastModified) {
		state.lastModified = lastModified
	},

	setSyncActive(state, active) {
		state.active = active
	},
}

const actions = {
}

export default { state, getters, mutations, actions }
