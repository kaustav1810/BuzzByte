'use client';

import React, {
	forwardRef,
	useEffect,
	useState,
} from 'react';
import './Feed.css';
import Tweetbox from './Tweetbox';
import Post from './Post';
import {
	collection,
	getDocs,
	orderBy,
	query,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import FlipMove from 'react-flip-move';
import withAuth from '../../app/hoc/withAuth';

const Feed = () => {
	const [posts, setPosts] = useState<any>([]);

	const postsCollection = collection(db, 'Posts');

	const getPostsFromDB = async () => {
		const postsSnapshot = await getDocs(
			postsCollection
		);

		let postsList: any = postsSnapshot.docs.map(
			(doc) => {
				return { ...doc.data(), postId: doc.id };
			}
		);

		postsList = postsList.sort((a, b) => {
			return (
				new Date(b.timeStamp).getTime() -
				new Date(a.timeStamp).getTime()
			);
		});

		console.log(postsList);

		setPosts(postsList);
	};

	useEffect(() => {
		getPostsFromDB();
	}, []);

	// const postInfo = {
	//   postAuthorInfo:{
	//     profileImg:'/images/profile_picture_latest.jpg',
	//     accountName:'Kaustav Banerjee',
	//     userName:'@kaustav1810',
	//     isVerified:true,
	//   },
	//   timeStamp:'15h',
	//   postContent: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio ipsam laboriosam quidem similique aliquid corrupti quae quibusdam adipisci soluta nemo? Ducimus, cupiditate voluptatibus. Odio, laudantium mollitia dolorem fugiat nostrum quod?Illum praesentium quo eveniet nulla, odio aperiam nostrum. Ab cupiditate quisquam architecto odit explicabo laborum veniam',
	//   postAnalytics:{
	//     likesCount:45,
	//     commentsCount:4,
	//     shareCount:5
	//   }

	// }
	return (
		<div className='feed'>
			<Tweetbox getPostsFromDB={getPostsFromDB} />
			<FlipMove>
				{posts.map((postItem) => (
					<Post
						key={postItem.postId}
						postInfo={postItem}
					/>
				))}
			</FlipMove>
		</div>
	);
};

export default Feed;
