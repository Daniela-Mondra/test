require 'rails_helper'

RSpec.describe "MaintenanceServices API", type: :request do
  let!(:services) { create_list(:maintenance_service, 5) }
  let(:service_id) { services.first.id }

  describe 'GET /api/v1/maintenance_services' do
    before { get '/api/v1/maintenance_services' }

    it 'returns maintenance services' do
      expect(json['maintenance_services']).not_to be_empty
      expect(json['maintenance_services'].size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/maintenance_services/:id' do
    before { get "/api/v1/maintenance_services/#{service_id}" }

    context 'when the service exists' do
      it 'returns the service' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(service_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the service does not exist' do
      let(:service_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find MaintenanceService/)
      end
    end
  end

  describe 'POST /api/v1/maintenance_services' do
    let(:valid_attributes) { { description: 'Oil change', status: 'pending', date: Date.today, car_id: services.first.car_id } }

    context 'when the request is valid' do
      before { post '/api/v1/maintenance_services', params: { maintenance_service: valid_attributes } }

      it 'creates a maintenance service' do
        expect(json['description']).to eq('Oil change')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/maintenance_services', params: { maintenance_service: { description: '' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/maintenance_services/:id' do
    let(:valid_attributes) { { status: 'completed' } }

    context 'when the service exists' do
      before { put "/api/v1/maintenance_services/#{service_id}", params: { maintenance_service: valid_attributes } }

      it 'updates the service' do
        expect(response.body).not_to be_empty
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the service does not exist' do
      let(:service_id) { 0 }
      before { put "/api/v1/maintenance_services/#{service_id}", params: { maintenance_service: valid_attributes } }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find MaintenanceService/)
      end
    end
  end

  describe 'DELETE /api/v1/maintenance_services/:id' do
    before { delete "/api/v1/maintenance_services/#{service_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
