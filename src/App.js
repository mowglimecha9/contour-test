import React from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Transactions from './Components/Transactions';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const axios = require('axios');
class App extends React.Component {
	componentDidMount() {
		axios.get('/accounts').then((response) => {
			this.setState({ accounts: response.data });
		});
	}

	constructor() {
		super();
		this.columns = [
			'ID',
			'Account Number',
			'Account Name',
			'Account Type',
			'Balance',
			'Currency',
			'Active',
		];
		this.state = {
			activeAccount: null,
			accounts: [],
		};
	}

	selectAccount(e, id) {
		e.preventDefault();
		this.setState({ activeAccount: id });
	}
	clearActive(e) {
		e.preventDefault();
		this.setState({ activeAccount: null });
	}

	render() {
		return (
			<div className="container">
				<svg preserveAspectRatio="xMidYMid meet" class="logo"  data-bbox="165.6 357.4 1199.6 146.1" viewBox="165.6 357.4 1199.6 146.1" xmlns="http://www.w3.org/2000/svg" data-type="color" role="img">
					<g>
						<path d="M1324.2 438.9c15.2-3.1 31.9-18 31.9-39.2 0-24.9-21.3-40.5-40.4-40.5h-70.6v141.9h21.8v-61.3h32.1l40 61.3h26.2l-41-62.2zm-57.3-60.1h46.6c11.5 0 20.7 9.2 20.7 20.9 0 11.4-9.6 20.5-20.7 20.5h-46.6v-41.4z" fill="#002355" data-color="1"></path>
						<path d="M1163 358.9v84.6c0 25.4-13.1 38.2-37.7 38.2s-37.7-12.8-37.7-38.2v-84.6h-21.8v85.3c0 36.6 22.8 59.3 59.5 59.3s59.5-22.7 59.5-59.3v-85.3H1163z" fill="#002355" data-color="1"></path>
						<path d="M238.2 480.9c-28.1 0-50.8-22.7-50.8-50.8s22.7-50.8 50.8-50.8c14.1 0 26.8 5.7 36 14.9l14.3-16.5c-13-12.6-30.8-20.3-50.3-20.3-40.1 0-72.6 32.5-72.6 72.6 0 40.1 32.5 72.6 72.6 72.6 22 0 41.8-9.8 55.1-25.3L276.9 463c-9.4 11-23.2 17.9-38.7 17.9z" fill="#002355" data-color="1"></path>
						<path d="M636.7 359.2v104.6c-3.3-4.3-80.2-104.6-80.2-104.6h-20.6V501h21.8V396.7c3.6 4.7 80 104.3 80 104.3h20.8V359.2h-21.8z" fill="#002355" data-color="1"></path>
						<path fill="#002355" d="M710.1 358.9v19.6h51.2v122.9H783V378.5h50.9v-19.6H710.1z" data-color="1"></path>
						<path d="M407.2 483.1c-29.2 0-52.9-23.7-52.9-52.9s23.7-52.9 52.9-52.9c25.9 0 47.4 18.6 52 43.1h19.9c-4.8-35.5-35.1-62.8-71.9-62.8-40.1 0-72.6 32.5-72.6 72.6 0 40.1 32.5 72.6 72.6 72.6 36.8 0 67.1-27.3 71.9-62.8h-19.9c-4.6 24.5-26.1 43.1-52 43.1z" fill="#ff6400" data-color="2"></path>
						<path d="M944 483.1c29.2 0 52.9-23.7 52.9-52.9s-23.7-52.9-52.9-52.9c-25.9 0-47.4 18.6-52 43.1h-19.9c4.8-35.5 35.2-62.8 71.9-62.8 40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.6-72.6 72.6-36.8 0-67.1-27.3-71.9-62.8H892c4.6 24.5 26.2 43.1 52 43.1z" fill="#ff6400" data-color="2"></path>
					</g>
				</svg>
				<div
					className={`trans ${
						this.state.activeAccount
							? 'initial'
							: 'initial-transactions'
					} } `}
				>
					{this.state.activeAccount ? (
						<Transactions
							accountId={this.state.activeAccount}
						></Transactions>
					) : (
						''
					)}
				</div>

				{this.state.activeAccount != null ? (
          <div className="fixedNav">
          <Button
						variant="contained"
						color="primary"
						startIcon={<ArrowBackIcon />}
						onClick={(e) => this.clearActive(e)}
					>
						Go Back{' '}
					</Button>
        </div>
				) : (
					''
				)}
				<div
					className={`trans ${
						this.state.activeAccount ? 'slideOut' : ''
					} } `}
				>
					<TableContainer component={Paper}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{this.columns.map((value) => (
										<TableCell key={value}>
											{value}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.accounts.map((row) => (
									<TableRow
                    className="pointer"
										key={row.id}
										onClick={(e) =>
											this.selectAccount(e, row.id)
										}
									>
										<TableCell component="th" scope="row">
											{row.id}
										</TableCell>
										<TableCell>
											{row.account_number}
										</TableCell>
										<TableCell>
											{row.account_name}
										</TableCell>
										<TableCell>
											{row.account_type.toUpperCase()}
										</TableCell>
										<TableCell>{row.balance}</TableCell>
										<TableCell>{row.currency}</TableCell>
										<TableCell>
											{row.is_active ? (
												<Chip
													label="Active"
													color="primary"
												/>
											) : (
												<Chip
													label="Inactive"
													color="secondary"
												/>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		);
	}
}

export default App;
