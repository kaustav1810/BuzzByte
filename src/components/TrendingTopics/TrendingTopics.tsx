'use client';

import React, {
	useEffect,
	useState,
} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LiveTweet } from './LiveTweet';
import { FollowerCard } from './FollowerCard';
import { Search } from '@mui/icons-material';
import {
	Box,
	IconButton,
	InputBase,
} from '@mui/material';
import styled from '@emotion/styled';
import Link from 'next/link';
import {
	onSnapshot,
	collection,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import withAuth from '../../app/hoc/withAuth';
import './TrendingTopics.css';

const SearchBox = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	backgroundColor: '#f1f3f4',
	borderRadius: '50px',
	padding: '5px 15px',
	position: 'sticky',
}));

const TrendingTopics = () => {
	const [liveTweets, setLiveTweets] =
		useState<any>([]);
	const [
		recommendedAccounts,
		setRecommendedAccounts,
	] = useState<any>([]);

	useEffect(() => {
		const getLiveTweets = onSnapshot(
			collection(db, 'liveOnX'),
			(snapshot) => {
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setLiveTweets(data);
			}
		);

		const getRecommendedAccounts = onSnapshot(
			collection(db, 'followingSuggestion'),
			(snapshot) => {
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setRecommendedAccounts(data);
			}
		);

		return () => {
			getLiveTweets();
			getRecommendedAccounts();
		};
	}, []);

	return (
		<div className='widgets'>
			<Box>
				<SearchBox>
					<IconButton
						sx={{ p: '10px' }}
						aria-label='search'>
						<Search />
					</IconButton>
					<InputBase
						placeholder='Search'
						inputProps={{
							'aria-label': 'search',
						}}
						sx={{ ml: 1, flex: 1 }}
					/>
				</SearchBox>
			</Box>

			<div className='widgets-card'>
				<h2>Live on X</h2>
				{liveTweets.map((liveTweet) => (
					<LiveTweet liveTweetInfo={liveTweet} />
				))}
				<div className='show-more-link'>
					<Link href={'#'}>Show more</Link>
				</div>
			</div>

			<div className='widgets-card'>
				<h2>Who to follow</h2>
				{recommendedAccounts.map((follower) => (
					<FollowerCard followerInfo={follower} />
				))}
				<div className='show-more-link'>
					<Link href={'#'}>Show more</Link>
				</div>
			</div>
		</div>
	);
};

export default (TrendingTopics);
