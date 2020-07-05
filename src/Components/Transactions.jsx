import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Skeleton from '@material-ui/lab/Skeleton';
import TablePagination from '@material-ui/core/TablePagination';



const axios = require('axios');
const dateFormat = "MMM DD YYYY - HH:mm:ss"


class Transactions extends React.Component {
	constructor(props) {
		super(props);
		this.ghostData  = [1,2,3,4,5,6,7]
		this.columns = [
			'ID',
			'Amount',
			'From',
			'Date',
            'Processed',
            'Action'
        ];
        this.mounted = false;
        this.dialog = false;
		this.state = {
			transactions: [],
			dialog: false,
			loading: false,
			selectedTransaction: {},
			rowsPerPage: 10,
			page: 0,
		};
    }

    handleClickOpen = (e,data) => {
        e.preventDefault();
        this.setState({ dialog: true });
        this.setState({selectedTransaction : data})
    };

    handleClose = (e) => {
        e.preventDefault();
        this.setState({dialog:false})
        this.setState({ selectedTransaction: {}});
    };

	componentDidMount(){
		this.setState({ loading: true });
		this.callTransaction(this.props.accountId)
	}

	callTransaction(accountId) {
        if (accountId) {
            axios
                .get('/accounts/' + accountId + '/transactions')
                .then((response) => {
					this.setState({
						transactions: response.data,
					 });
					 setTimeout(() => {
						 this.setState({loading:false})
					}, 500);

                });
        } else {
            alert('please go back and select account');
        }
	}

	handleChangePage(e,page) {
		this.setState({page:page})
	}

	changeRowsPerPage(e) {
		console.log(e.target.value)
		this.setState({ rowsPerPage: e.target.value})
	}

	render() {
		return (
			<div>
				<Dialog
					open={this.state.dialog}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Transaction Details
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<div>
								{this.state.selectedTransaction
									.transaction_processed ? (
									<Chip label="Processed" color="primary" />
								) : (
									<Chip
										label="Not Processed"
										color="secondary"
									/>
								)}
								<ul>
									<li>
										<strong>Transaction Date: </strong>{' '}
										{this.state.selectedTransaction
											.transaction_date &&
											moment
												.utc(
													this.state.selectedTransaction.transaction_date.replace(
														' ',
														''
													)
												)
												.format(dateFormat)}
									</li>
									<li>
										<strong>Amount :</strong>{' '}
										{this.state.selectedTransaction.amount}
									</li>
									<li>
										<strong>From :</strong>{' '}
										{this.state.selectedTransaction.from}
									</li>
									<li>
										<strong>Description :</strong>{' '}
										{
											this.state.selectedTransaction
												.description
										}
									</li>
								</ul>
							</div>
						</DialogContentText>
					</DialogContent>
				</Dialog>

				<TableContainer component={Paper}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{this.columns.map((value) => (
									<TableCell key={value}>{value}</TableCell>
								))}
							</TableRow>
						</TableHead>
						{!this.state.loading ? (
							<TableBody>
								{this.state.transactions
									.slice(
										this.state.page *
											this.state.rowsPerPage,
										this.state.page *
											this.state.rowsPerPage +
											this.state.rowsPerPage
									)
									.map((row) => (
										<TableRow key={row.id}>
											<TableCell
												component="th"
												scope="row"
											>
												{row.id}
											</TableCell>
											<TableCell>{row.amount}</TableCell>
											<TableCell>
												{row.from.toUpperCase()}
											</TableCell>
											<TableCell>
												{moment
													.utc(
														row.transaction_date.replace(
															' ',
															''
														)
													)
													.format(dateFormat)}
											</TableCell>
											<TableCell>
												{row.transaction_processed ? (
													<Chip
														label="Processed"
														color="primary"
													/>
												) : (
													<Chip
														label="Not Processed"
														color="secondary"
													/>
												)}
											</TableCell>
											<TableCell>
												<Button
													variant="contained"
													color="default"
													startIcon={
														<VisibilityIcon />
													}
													onClick={(e) =>
														this.handleClickOpen(
															e,
															row
														)
													}
												>
													View Transaction Details
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						) : (
							<TableBody>
								{this.ghostData.map((row) => (
									<TableRow key={row}>
										<TableCell>
											<Skeleton variant="text"></Skeleton>
										</TableCell>
										<TableCell>
											<Skeleton variant="text"></Skeleton>
										</TableCell>
										<TableCell>
											<Skeleton variant="text"></Skeleton>
										</TableCell>
										<TableCell>
											<Skeleton variant="text"></Skeleton>
										</TableCell>
										<TableCell>
											<Skeleton variant="text"></Skeleton>
										</TableCell>
										<TableCell>
											<Skeleton variant="text"></Skeleton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						)}
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={this.state.transactions.length}
					rowsPerPage={this.state.rowsPerPage}
					page={this.state.page}
					onChangePage={(e,value) => this.handleChangePage(e,value)}
					onChangeRowsPerPage={(e) => this.changeRowsPerPage(e)}
				/>
			</div>
		);
	}
}

export default Transactions;
