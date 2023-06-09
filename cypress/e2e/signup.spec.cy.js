import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
//import { it } from 'faker/lib/locales'

describe('Signup', () => {

    //    beforeEach(function () {
    //       cy.fixture('deliver').then((d) => {
    //           this.deliver = d
    //        })
    //    })

    it('Usuário deve se tornar um entregador', function () {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentSholdBe(expectedMessage)
    })

    it('CPF Incorreto', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '123457'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    }),

        it('Email Incorreto', function () {

            var deliver = signupFactory.deliver()

            deliver.email = 'teste.com.br'

            signupPage.go()
            signupPage.fillForm(deliver)
            signupPage.submit()
            signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
        })

        context('Campos Obrigatórios', function(){
            
            const messages = [
                {field: 'name', output: 'É necessário informar o nome'},
                {field: 'cpf', output: 'É necessário informar o CPF'},
                {field: 'email', output: 'É necessário informar o email'},
                {field: 'postalcode', output: 'É necessário informar o CEP'},
                {field: 'number', output: 'É necessário informar o número do endereço'},
                {field: 'delivery_method', output: 'Selecione o método de entrega'},
                {field: 'cnh', output: 'Adicione uma foto da sua CNH'},       
            ]

            before(function(){
                signupPage.go()
                signupPage.submit()
            })

            messages.forEach(function(msg){
                it(`${msg.field} is required`, function(){
                    signupPage.alertMessageShouldBe(msg.output)
                })
            })

        })

    it('Campos Obrigatórios', function () {

        signupPage.go()
        signupPage.submit()

        signupPage.alertMessageShouldBe('É necessário informar o nome')
        signupPage.alertMessageShouldBe('É necessário informar o CPF')
        signupPage.alertMessageShouldBe('É necessário informar o email')
        signupPage.alertMessageShouldBe('É necessário informar o CEP')
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        signupPage.alertMessageShouldBe('Selecione o método de entrega')
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')

    })

})