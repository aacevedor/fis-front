export class ValidationService{

  static getValidatorsErrorMessage( validatorName: string, validatorValue?: any){

    let config = {
      'invalidEmailAddress':'Invalid email address'
    }

    return config[validatorName]
  }

}
