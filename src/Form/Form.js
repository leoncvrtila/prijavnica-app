import React, {Component} from 'react'
import * as axios from 'axios'
import {storage} from '../firebase/firebase'

import OibInput from './Input/oibInput'
import NameInput from './Input/nameInput'
import SurnameInput from './Input/surnameInput'
import SexBtns from './Input/sexBtns'
import BirthdateInput from './Input/birthdateInput'
import StateOfBirthInput from './Input/stateOfBirthInput'
import CountyInput from './Input/countyInput'
import CityInput from './Input/cityInput'
import TownshipInput from './Input/townshipInput'
import AddressInput from './Input/addressInput'
import ZipCodeInput from './Input/zipCodeInput'
import TelInput from './Input/telInput'
import EmailInput from './Input/emailInput'
import QualificationInput from './Input/qualificationInput'
import ProfessionalTitleInput from './Input/professionalTitleInput'
import StudyInput from './Input/studyInput'
import StatusInput from './Input/studyInput'
import EmploymentBtns from './Input/employmentBtns'
import PensionerBtns from './Input/pensionerBtns'


import Aux from '../hoc/Aux'
import Error from '../hoc/Error'
import '../assets/css/input.scss'



class Form extends Component {

	state={ 
		
		form: [],
		title: 'Pristupnica za nove članove',
		errorModal: false, 						// ukoliko netko nesto krivo napise izbaci se modal
		image: null, 							// slika koja se ucita kada se odabere 
		url: '', 								// url ucitane slike nakon sta se uploada na firebase
		percentage: null, 						// postotak koji se prikaze prilikom postavljanja slike - da korisnik zna koliko treba
		nogomet: false, 						// polja interesa - false - prema tome se definira value i background
		ribolov: false,
		bela: false,
		pikado: false,
		humanitarian: false,
		employment: false, 						// false - prema tome se definira value i background
	//	radioValue: null,
		pensioner: false, 						// false - prema tome se definira value i background
		error: false, 							// ukoliko se desi neki problem prilikom ucitavanja forme ili slanja iste 
		response: false
        
	}

	componentDidMount() {
        axios.get('https://udruga-desk.firebaseio.com/form.json')
            .then(response => {
                this.setState({form: response.data});
			})
    }


   /* checkValidity(value,rules) { // value -> event.target.value | rules -> this.state.form[formName].validation ( required: true, isPensioner: true)
		
		let isValid = true;
		
		if(rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		
		if(rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		
		if(rules.isEmail) {
            const pattern = (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
            isValid = pattern.test(value) && isValid
        }
        
        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
		
		return isValid;
	}*/

	inputChangedHandler = (event, formName) => {
	   
		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.value,
				//valid: this.checkValidity(event.target.value, this.state.form[formName].validation),
                touched: true
            }
		};
		
		this.setState({form: updatedForm}); 

	}


	countyChangedHandler = (event, formName) => { // county

		
		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.value,
				valueId: this.state.form.county.elementConfig.options[event.target.selectedIndex].id,
                touched: true
            }
		};
		
        this.setState({form: updatedForm}); 

	}

	
	clickSexHandler = (event, formName) => { // sex

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.innerText
            }
		};
		
		this.setState({form: updatedForm}); 

	}

	clickEmploymentHandler = (event, formName) => { // employment

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.innerText
            }
		};
		
		this.setState({form: updatedForm}); 
	}

	clickPensionerHandler = (event, formName) => { // pensioner

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.innerText
            }
		};
		
		this.setState({form: updatedForm}); 
	}

	 submitHandler = (e) => { 												// saljem podatke u member.json (firebase)
		
		e.preventDefault();
		

		const stateAll = this.state.form;

		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
		let yyyy = today.getFullYear();
		
		const member = {
				imgUrl: this.state.url,
				name: stateAll.name.value,
				surname: stateAll.surname.value,
				oib: stateAll.oib.value,
				sex: stateAll.sex.value,
				birthdate: stateAll.birthdate.value,
				stateOfBirth: stateAll.stateOfBirth.value,
				county: stateAll.county.value,
				city: stateAll.city.value ? stateAll.city.value : '/', 	// ukoliko je value true onda ga ispisi inace ispisi: /
				township: stateAll.township.value ? stateAll.township.value : '/',
				address: stateAll.address.value,
				zipCode: stateAll.zipCode.value,
				tel: stateAll.tel.value,
				email: stateAll.email.value ? stateAll.email.value : '/',
				qualifications: stateAll.qualifications.value,
				status: stateAll.status.value,
				professionalTitle: stateAll.professionalTitle.value ? stateAll.professionalTitle.value : '/',
				study: stateAll.study.value ? stateAll.study.value : '/',
				employment: stateAll.employment.value ? stateAll.employment.value : '/',
				pensioner: stateAll.pensioner.value ? stateAll.pensioner.value : '/',
				nogomet: this.state.nogomet ? 'Nogomet' : '/',
				ribolov: this.state.ribolov ? 'Ribolov' : '/',
				bela: this.state.bela ? 'Bela' : '/',
				pikado: this.state.pikado ? 'Pikado' : '/',
				assembly: 'Član skupštine',
				centralCommittee: '/',
				presidency: '/', 
				president: '/',
				vicePresident: '/',
				secretary: '/',
				supervisoryBoard: '/',
				active: 'Ne',
				date: today
		}
	
		const headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			"Access-Control-Allow-Origin": "*",
		  }

		if(																	// ukoliko su popunjena odredena polja onda se moze poslat inace iskoci modalni prozor
			(stateAll.oib.value !== '') && 
			(stateAll.name.value !== '') &&
			(stateAll.surname.value !== '') &&
			(stateAll.sex.value !== '') &&
			(stateAll.birthdate.value !== '') &&
			(stateAll.stateOfBirth.value !== '') &&
			(stateAll.county.value !== '') &&
			((stateAll.township.value !== '') || (stateAll.city.value !== '')) &&
			(stateAll.address.value !== '') &&
			(stateAll.zipCode.value !== '') &&
			(stateAll.tel.value !== '') &&
			(stateAll.qualifications.value !== '') &&
			(stateAll.status.value !== '') 			
		 ) {

		
				today = dd + '.' + mm + '.' + yyyy; 							// postavljajne danasnjeg datuma kao dan upisa
			
	    	 axios.post('https://udruga-desk.firebaseio.com/member.json', {
				cardNum: '/',
				imgUrl: this.state.url ? this.state.url : '/',
				name: stateAll.name.value,
				surname: stateAll.surname.value,
				oib: stateAll.oib.value,
				sex: stateAll.sex.value,
				birthdate: stateAll.birthdate.value,
				stateOfBirth: stateAll.stateOfBirth.value,
				county: stateAll.county.value,
				city: stateAll.city.value ? stateAll.city.value : '/', 	// ukoliko je value true onda ga ispisi inace ispisi: /
				township: stateAll.township.value ? stateAll.township.value : '/',
				address: stateAll.address.value,
				zipCode: stateAll.zipCode.value,
				tel: stateAll.tel.value,
				email: stateAll.email.value ? stateAll.email.value : '/',
				qualifications: stateAll.qualifications.value,
				status: stateAll.status.value,
				professionalTitle: stateAll.professionalTitle.value ? stateAll.professionalTitle.value : '/',
				study: stateAll.study.value ? stateAll.study.value : '/',
				employment: stateAll.employment.value ? stateAll.employment.value : '/',
				pensioner: stateAll.pensioner.value ? stateAll.pensioner.value : '/',
				nogomet: this.state.nogomet ? 'Nogomet' : '/',
				ribolov: this.state.ribolov ? 'Ribolov' : '/',
				bela: this.state.bela ? 'Bela' : '/',
				pikado: this.state.pikado ? 'Pikado' : '/',
				humanitarian: this.state.humanitarian ? 'humanitarniRad' : '/',
				assembly: 'Član skupštine',
				centralCommittee: '/',
				presidency: '/', 
				president: '/',
				vicePresident: '/',
				secretary: '/',
				supervisoryBoard: '/',
				active: 'Ne',
				date: today
			},
			{
				headers: headers
			  })
			.then(response => {
				//console.log('Sljedeće: >') 						     // ispisi ono sta je poslano
				//console.log(response)
				//this.setState({response: true});
				console.log(response.data.name)
				if(response.data.name){
					window.location.href = 'success'
				}
				
			})
			.catch(error => {
				this.setState({error: true});							// hoc error
			});
			
			
			
																		
														   				// prosljedivanje korisnika na success page
				//window.location.href = 'success'
			
			
				

		} else {
			
			this.setState(prevState => ({
				errorModal: !prevState.errorModal
			})) 
		}

		/*if(!this.state.response) {
			console.log('Nije prošao kroz axios')
		}

		if(this.state.response) {
			console.log('Prošao je kroz axios')
			window.location.href = 'success'
		}*/

	}
	
	errorModalHandler = () => {
		this.setState(prevState => ({									// error modal
			errorModal: !prevState.errorModal
		})) 
	}

	errorHandler = () => {	
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    fileHandler = (e) => {

        if(e.target.files[0]) {											// postavljanje odabrane slike kao image state
            const image = e.target.files[0];
            this.setState(() => ({image}));
		}

		

    }

    uploadHandler = () => {

		
		
		const {image} = this.state;										//uploadanje slike na firebase
		const uploadTask = storage.ref(`${image.name}`).put(image);
		uploadTask.on('state_changed', 
		(snapshot) => {
				let percentage = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
				this.setState({percentage: percentage})
		}, 
		(error) => { 													// error function
			console.log(error);
		}, 
		() => {
																		// complete funtion
		storage.ref('').child(image.name).getDownloadURL().then(url => {
			this.setState({url});
		})
		
		});  
    }

	nogometHandler = () =>{												// btns za polje interesa

		this.setState(prevState=>({
			nogomet: !prevState.nogomet
		}))
	}

	ribolovHandler = () =>{

		this.setState(prevState=>({
			ribolov: !prevState.ribolov
		}))
	}

	belaHandler = () =>{

		this.setState(prevState=>({
			bela: !prevState.bela
		}))
	}

	pikadoHandler = () =>{

		this.setState(prevState=>({
			pikado: !prevState.pikado
		}))
	}

	humanitarianHandler = () =>{

		this.setState(prevState=>({
			humanitarian: !prevState.humanitarian
		}))
	}


    render() {

	     	
	const formElementsArray = [];									// prolazi kroz form i pretvara ga u array
	for (let key in this.state.form) {
		formElementsArray.push({
			id: key,
			config: this.state.form[key]
		});
	}

	let oibInput = formElementsArray.map(formElement => (	
		<OibInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let nameInput = formElementsArray.map(formElement => (
		<NameInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let surnameInput = formElementsArray.map(formElement => (
		<SurnameInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let birthdateInput = formElementsArray.map(formElement => (
		<BirthdateInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let stateOfBirthInput = formElementsArray.map(formElement => (
		<StateOfBirthInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let addressInput = formElementsArray.map(formElement => (
		<AddressInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let zipCodeInput = formElementsArray.map(formElement => (
		<ZipCodeInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let telInput = formElementsArray.map(formElement => (
		<TelInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let emailInput = formElementsArray.map(formElement => (
		<EmailInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let professionalTitleInput = formElementsArray.map(formElement => (
		<ProfessionalTitleInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let studyInput = formElementsArray.map(formElement => (
		<StudyInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let countyInput = formElementsArray.map(formElement => (
		<CountyInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changedCounty={(event) => this.countyChangedHandler(event, formElement.id)}
		/>
	));

	let cityInput = formElementsArray.map(formElement => (
		<CityInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			citySelect={this.state.form.county.elementConfig.options[this.state.form.county.valueId].city} // to je lista gradova ciji je popis unutar objekta od zupanija
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let townshipInput = formElementsArray.map(formElement => (
		<TownshipInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			townshipSelect={this.state.form.county.elementConfig.options[this.state.form.county.valueId].township}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));
	

	let qualificationInput = formElementsArray.map(formElement => (
		<QualificationInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));


	let statusInput = formElementsArray.map(formElement => (
		<StatusInput 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			changed={(event) => this.inputChangedHandler(event, formElement.id)}
		/>
	));

	let sexBtns = formElementsArray.map(formElement => (
		<SexBtns 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			sexOpt={formElement.config.sexOpt}
			value={formElement.config.value}
			innerValue={formElement.config.value}
			radioValue={this.state.radioValue}
			clickSex={(event) => this.clickSexHandler(event, formElement.id)}
		/>
	));


	let employmentBtns = formElementsArray.map(formElement => (
		<EmploymentBtns 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			employmentOpt={formElement.config.employmentOpt}
			value={formElement.config.value}
			radioValue={this.state.radioValue}
			clickEmployment={(event) => this.clickEmploymentHandler(event, formElement.id)}
		/>
	));


	let pensionerBtns = formElementsArray.map(formElement => (
		<PensionerBtns 
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementName={formElement.config.elementName}
			elementConfig={formElement.config.elementConfig}
			pensionerOpt={formElement.config.pensionerOpt}
			value={formElement.config.value}
			radioValue={this.state.radioValue}
			clickPensioner={(event) => this.clickPensionerHandler(event, formElement.id)}
		/>
	));

        return (
			
			<Aux>

				<Error
                error={this.state.error}
                errorHandler={this.errorHandler}
                />


				<div className="formWrap">
					<h1>{this.state.title}</h1>
					<div className="errorModal" style={{display: this.state.errorModal ? 'flex' : 'none'}} onClick={this.errorModalHandler}><span>Provjerite jeste li ispunili sva obavezna polja.</span><span>x</span></div>
					<div className="Form">
						<form onSubmit={this.submitHandler}>
							<h5>Polja označena sa * su obavezna.</h5>

							<img src={this.state.url ? '' + this.state.url +'' : 'http://via.placeholder.com/100x150'} alt="Uploaded file"/>
							<br />
							<input type="file" 
							onChange={this.fileHandler}
							name="file"
							className="inputfile"
							id="file"
							/>
							
							<label className="chooseImg" htmlFor="file">Odaberi sliku</label>
							<br />
							<p style={{textAlign: 'center', display: this.state.percentage ? 'block' : 'none'}}>Učitavanje slike: {this.state.percentage}%</p>
							<label className="chooseImg" onClick={this.uploadHandler} style={{display: this.state.image ? 'block' : 'none', marginLeft: 'auto', marginRight: 'auto'}}>Postavi odabranu sliku</label>

								{oibInput}
								{nameInput}
								{surnameInput}
								{sexBtns}
								{birthdateInput}
								{stateOfBirthInput}
								{countyInput}
								{cityInput}
								{townshipInput}
								{addressInput}
								{zipCodeInput}
								{telInput}
								{emailInput}
								{qualificationInput}
								{statusInput}
								{professionalTitleInput}
								{studyInput}
								{employmentBtns}
								{pensionerBtns}
								<h4>Polja interesa</h4>
								<div className="fieldOfInterest">
									<label onClick={this.nogometHandler} className="chooseInterest" style={{background: this.state.nogomet ? '#343a40' : 'none', color:this.state.nogomet ? 'white' : 'black' }}>Nogomet</label>
									<label onClick={this.ribolovHandler} className="chooseInterest" style={{background: this.state.ribolov ? '#343a40' : 'none', color:this.state.ribolov ? 'white' : 'black' }}>Ribolov</label>
									<label onClick={this.belaHandler} className="chooseInterest" style={{background: this.state.bela ? '#343a40' : 'none', color:this.state.bela ? 'white' : 'black' }}>Bela</label>
									<label onClick={this.pikadoHandler} className="chooseInterest" style={{background: this.state.pikado ? '#343a40' : 'none', color:this.state.pikado ? 'white' : 'black' }}>Pikado</label>
									<label onClick={this.humanitarianHandler} className="chooseInterest" style={{background: this.state.humanitarian ? '#343a40' : 'none', color:this.state.humanitarian ? 'white' : 'black' }}>Humanitarni rad</label>
								</div>
							<br /><hr />
							<h6>
							{this.state.title}<br/>
							Slanjem ove Pristupnice prihvaćam Program, Statut i Etički kodeks udruge UHB RH, te sam suglasan da se sukladno Zakonu o zaštiti osobnih podataka (NN 103/03, 118/06), moji osobni podaci mogu koristiti i obrađivati. 
							Predsjedništvo udruge će osigurati sve mjere zaštite osobnih podataka za članove udruge UHB RH, sukladno Zakonu o zaštiti osobnih podataka (NN 103/03, 118/06). 
							</h6>
							<hr /><br />
							<button type="submit" className="submitBtn">Pošalji</button>
						</form>
					</div>
				</div>

			</Aux>

        );

    }

}


export default Form;