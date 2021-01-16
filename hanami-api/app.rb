# frozen_string_literal: true

require "bundler/setup"
require "hanami/api"
require "hanami/middleware/body_parser"
require 'aws-sdk-dynamodb'

class App < Hanami::API
  use Hanami::Middleware::BodyParser, :json

  TABLE_NAME = 'moggs-calendar'

  post '/moggs-booking-calendar/api/v1/day' do
    table_item = {
      table_name: TABLE_NAME,
      item: {
        id: '1',
        day: "#{params[:year]}-#{"%02d" % params[:month]}-#{"%02d" % params[:day]}",
        schoolHoliday: params[:schoolHoliday],
        publicHoliday: params[:publicHoliday],
        notes: params[:notes],
        bookings: params[:bookings]
      }
    }
    dynamodb_client = Aws::DynamoDB::Client.new
    dynamodb_client.put_item(table_item)

    status 201
    json({})
  end

  get '/moggs-booking-calendar/api/v1/calendar' do
    year = params[:year].to_i
    month = params[:month].to_i

    dynamodb_client = Aws::DynamoDB::Client.new
    params = {
      table_name: TABLE_NAME,
      key_condition_expression: "#id = :id  and begins_with(#day, :year_month)",
      expression_attribute_names: {
          "#id" => 'id',
          "#day" => "day"
      },
      expression_attribute_values: {
        ':id': '1',
        ':year_month': "#{year}-#{"%02d" % month}"
      }
    }

    result = dynamodb_client.query(params)

    results = result.items.map do |item|
      {
        year: item['day'][0..3].to_i,
        month: item['day'][5..6].to_i,
        day: item['day'][8..9].to_i,
        schoolHoliday: item['schoolHoliday'],
        publicHoliday: item['publicHoliday'],
        bookings: item['bookings'],
        notes: item['notes']
      }
    end

    status 200
    json(results)
  end
end
