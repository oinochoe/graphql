import React from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
	font-size: 50px;
	font-weight: 600;
	width: calc(100% - 80px);
	resize: none;
	border: 3px solid #333;
	&::placeholder {
		font-weight: 600;
		font-size: 50px;
	}
`;

const ContentPreview = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 20px;
`;

const ContentInput = styled(TextareaAutosize)`
	width: 100%;
	font-size: 16px;
	margin-top: 15px;
	resize: none;
	border: 3px solid #333;
	padding: 10px;
	margin-top: 10px;
	box-sizing: border-box;
	&::placeholder {
		font-size: 16px;
	}
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Button = styled.button`
	display: block;
	width: 80px;
	height: 69px;
	margin-left: 10px;
	border: 3px solid #333;
	color: #333;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		background: #333;
		color: #fff;
	}
`;

export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title || "",
			content: props.content || "",
			id: props.id || null,
		};
	}
	render() {
		const { title, content } = this.state;
		return (
			<>
				<TitleContainer>
					<TitleInput
						value={title}
						onChange={this._onInputChange}
						placeholder={"Untitled..."}
						name={"title"}
					/>
					<Button onClick={this._onSave}>저장</Button>
				</TitleContainer>
				<ContentPreview>
					<ContentInput
						value={content}
						onChange={this._onInputChange}
						placeholder={"# This supports markdown!"}
						name={"content"}
					/>
					<MarkdownRenderer markdown={content} className={"markdown"} />
				</ContentPreview>
			</>
		);
	}
	_onInputChange = event => {
		const {
			target: { value, name },
		} = event;
		this.setState({
			[name]: value,
		});
	};
	_onSave = () => {
		const { onSave } = this.props;
		const { title, content, id } = this.state;
		onSave(title, content, id);
	};
}
