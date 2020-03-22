import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../Components/plus.svg";
import styled from "styled-components";
import { GET_NOTES } from "../../queries";

const Header = styled.div`
	margin-bottom: 50px;
`;

const Title = styled.h1`
	display: flex;
	align-items: center;
	font-size: 40px;
	font-weight: 600;
	margin: 0;
	margin-bottom: 30px;
	svg {
		height: 100%;
	}
`;

const Button = styled.div`
	display: flex;
	width: 60px;
	height: 60px;
	margin: 0 10px;
	align-items: center;
	padding: 10px;
	border-radius: 10px;
	cursor: pointer;
	&:hover {
		opacity: 0.8;
	}
`;

const Subtitle = styled.h2`
	color: #aaa;
	font-weight: 400;
`;

const Notes = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
`;

const Note = styled.div`
	padding: 10px;
	padding-left: 5px;
	transition: background-color 0.1s linear;
	cursor: pointer;
	border-radius: 5px;
	margin-bottom: 10px;
	&:hover {
		background-color: #eeeeee;
	}
`;

const NoteTitle = styled.span`
	padding-bottom: 5px;
	font-weight: 600;
	font-size: 20px;
`;

const Footer = styled.div`
	font-size: 10px;
	color: #aaa;
	text-transform: uppercase;
`;

export default class NotesContainer extends React.Component {
	render() {
		return (
			<>
				<Header>
					<Title>
						Simple Note
						<Link to={"/add"}>
							<Button>
								<Plus />
							</Button>
						</Link>
					</Title>
					<Subtitle>Taking notes something...</Subtitle>
				</Header>
				<Notes>
					<Query query={GET_NOTES}>
						{({ data }) =>
							data.notes
								? data.notes.map(note => (
										<Link
											to={`/note/${note.id}`}
											key={note.id}
										>
											<Note>
												<NoteTitle>
													{note.title}
												</NoteTitle>
											</Note>
										</Link>
								  ))
								: null
						}
					</Query>
				</Notes>
				<Footer>
					Copyright &copy; Sitcom Corporation. All Rights reserved
				</Footer>
			</>
		);
	}
}
