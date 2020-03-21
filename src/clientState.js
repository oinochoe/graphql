import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";

export const defaults = {
	notes: [
		{
			__typename: "Note", // local에서 작업 시 무조건 필요함.
			id: 1,
			title: "First",
			content: "Second",
		},
	],
};
export const typeDefs = [
	`
    schema {
        query: Query
        mutation : Mutation
    }
    type Query {
        notes: [Note]!
        note(id: Int!): Note
    }
    type Mutation{
        createNote(title: String!, content: String!) : Note
        editNote(id: String!, title: String!, content:String!) : Note
    }
    type Note {
        id:Int!
        title:String!
        content:String!
    }
    `,
];

export const resolvers = {
	Query: {
		note: (_, variables, { cache }) => {
			const id = cache.config.dataIdFromObject({
				__typename: "Note",
				id: variables.id,
			});
			const note = cache.readFragment({
				fragment: NOTE_FRAGMENT,
				id,
			});
			return note;
		},
	},
	Mutation: {
		createNote: (_, variables, { cache }) => {
			const notes = cache.readQuery({ query: GET_NOTES });
			const { title, content } = variables;
			const newNote = {
				__typename: "Note",
				title,
				content,
				id: notes.length + 1,
			};
			console.log(notes);
			cache.writeData({
				data: {
					notes: [newNote, ...notes],
				},
			});
			return newNote;
		},
	},
};
