'use strict';

var chai = require('chai');
chai.should();

var validate = require('./validate');

describe('Validate', function () {
  /* jshint expr:true */

	describe('Email', function () {
		it('should not allow empty string', function () {
			validate.isEmail('').should.be.false;
		});
		it('should allow a valid email', function () {
			validate.isEmail('foo@example.org').should.be.true;
		});
	});
	describe('String', function () {
		it('should not allow empty string', function () {
	      validate.required('').should.be.false;
	    });
	    it('should allow string that is not empty', function () {
	      validate.required('hehehe').should.be.true;
	    });
	});
	describe('Lengd', function () {
		it('should not contain a sting of length 2 if n is 1', function () {
	      validate.length('ek',3).should.be.false;
	    });
	    it('can contain a string of lengt 1 if n is 1', function () {
	    	validate.length('e',1).should.be.true;
	    });
	});
	describe('Adress', function () {
		it('should not contain only numbers', function () {
	      validate.address('993').should.be.false;
	    });
	    it('should contain first string and then numbers', function () {
	    	validate.address('Hrauntunga 109').should.be.true;
	    });
	});
	describe('oneOf', function () {
		it('there is no s in the array [q,w,e]', function () {
	      validate.oneOf('s', ['q','w','e']).should.be.false;
	    });
	    it('there is a in the array [s, u, n, n, a]', function () {
	    	validate.oneOf('a', ['s', 'u', 'n', 'n', 'a']).should.be.true;
	    });
	});
	describe('phonenumber', function () {
		it('a4 is not a phonenumber', function () {
	      validate.phonenumber('a4').should.be.false;
	    });
	    it('7763521 is a phonenumber', function () {
	    	validate.phonenumber('776-3521').should.be.true;
	    });
	});	


});


