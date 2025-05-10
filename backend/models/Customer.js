// models/Customer.js

class Customer {
  constructor(data) {
    this.number = parseInt(data.Number);
    this.nameOfLocation = data['Name of Location'] ? String(data['Name of Location']).trim() : null;
    this.date = data.Date ? String(data.Date).trim() : null;
    this.loginHour = data['Login Hour'] ? String(data['Login Hour']).trim() : null;
    this.name = data.Name ? String(data.Name).trim() : '';
    this.age = parseInt(data.Age);
    this.gender = data.gender ? String(data.gender).trim() : '';
    this.email = data.Email ? String(data.Email).trim() : '';
    this.noTelp = data['No Telp'] ? String(data['No Telp']).trim() : '';
    this.brandDevice = data['Brand Device'] ? String(data['Brand Device']).trim() : '';
    this.digitalInterest = data['Digital Interest'] ? String(data['Digital Interest']).trim() : '';
    this.locationType = data['Location Type'] ? String(data['Location Type']).trim() : '';
  }

  isValid() {
    const valid =
      this.name &&
      this.email &&
      this.gender &&
      this.locationType &&
      this.digitalInterest &&
      this.brandDevice &&
      !isNaN(this.age);

    if (!valid) {
      // Optional: log invalid fields for debugging
      const errors = [];

      if (!this.name) errors.push('name');
      if (!this.email) errors.push('email');
      if (!this.gender) errors.push('gender');
      if (!this.locationType) errors.push('locationType');
      if (!this.digitalInterest) errors.push('digitalInterest');
      if (!this.brandDevice) errors.push('brandDevice');
      if (isNaN(this.age)) errors.push('age');

      this.validationErrors = errors;
    }

    return valid;
  }

  getValidationErrors() {
    return this.validationErrors || [];
  }

  toDocument() {
    return {
      number: this.number,
      nameOfLocation: this.nameOfLocation,
      date: this.date,
      loginHour: this.loginHour,
      name: this.name,
      age: this.age,
      gender: this.gender,
      email: this.email,
      noTelp: this.noTelp,
      brandDevice: this.brandDevice,
      digitalInterest: this.digitalInterest,
      locationType: this.locationType
    };
  }
}

module.exports = Customer;