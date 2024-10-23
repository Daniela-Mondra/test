require 'rails_helper'

RSpec.describe "Cars API", type: :request do
  let!(:cars) { create_list(:car, 5) }
  let(:car_id) { cars.first.id }

  describe 'GET /api/v1/cars' do
    before { get '/api/v1/cars' }

    it 'returns cars' do
      expect(json['cars']).not_to be_empty
      expect(json['cars'].size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/cars/:id' do
    before { get "/api/v1/cars/#{car_id}" }

    context 'when the car exists' do
      it 'returns the car' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(car_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the car does not exist' do
      let(:car_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Car/)
      end
    end
  end

  describe 'POST /api/v1/cars' do
    let(:valid_attributes) { { plate_number: 'ABC123', model: 'Sedan', year: 2022 } }

    context 'when the request is valid' do
      before { post '/api/v1/cars', params: { car: valid_attributes } }

      it 'creates a car' do
        expect(json['plate_number']).to eq('ABC123')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/cars', params: { car: { plate_number: '' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/cars/:id' do
    let(:valid_attributes) { { model: 'SUV' } }

    context 'when the car exists' do
      before { put "/api/v1/cars/#{car_id}", params: { car: valid_attributes } }

      it 'updates the car' do
        expect(response.body).not_to be_empty
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the car does not exist' do
      let(:car_id) { 0 }
      before { put "/api/v1/cars/#{car_id}", params: { car: valid_attributes } }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Car/)
      end
    end
  end

  describe 'DELETE /api/v1/cars/:id' do
    before { delete "/api/v1/cars/#{car_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
