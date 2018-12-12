import * as React from 'react';

//import PropTypes from 'prop-types';
//import DatePicker from 'react-datepicker';
//import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
// The file contains custom field render components used in the redux form in the purchase requestwebpart.

var requiredMessageStyle = {
  color: 'Red'
};

// Custom renderer for dropdown field with validation message
export class renderDropDown extends React.Component<any, {}>{
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <select {...this.props.input}>
          {this.props.children}
        </select>
        <br />
        {this.props.meta.touched && this.props.meta.error && <span style={requiredMessageStyle}>{this.props.meta.error}</span>}
      </div>
    );
  }
}

// Custom renderer for Input fields with validation message
export class renderInput extends React.Component<any, {}>{
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input {...this.props.input} placeholder={this.props.placeholder}></input>
        <br />
        {this.props.meta.touched && this.props.meta.error && <span style={requiredMessageStyle}>{this.props.meta.error}</span>}
      </div>
    );
  }
}

// export class renderDatePicker extends React.Component {
//   static propTypes = {
//     input: PropTypes.shape({
//       onChange: PropTypes.func.isRequired,
//       value: PropTypes.string.isRequired,
//     }).isRequired,
//     meta: PropTypes.shape({
//       touched: PropTypes.bool,
//       error: PropTypes.bool,
//     }),
//     placeholder: PropTypes.string,
//   }

//   static defaultProps = {
//     placeholder: ''
//   }

//   constructor (props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleChange (date) {
//     this.props.input.onChange(moment(date).format('YYYY-MM-DD'))
//   }

//   render () {
//     const {
//       input, placeholder,
//       meta: {touched, error}
//     } = this.props

//     return (
//       <div>
//         <DatePicker
//           {...input}
//           placeholder={placeholder}
//           dateFormat="YYYY-MM-DD"
//           selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
//           onChange={this.handleChange}
//         />
//         {touched && error && <span>{error}</span>}
//       </div>
//     )
//   }
// }