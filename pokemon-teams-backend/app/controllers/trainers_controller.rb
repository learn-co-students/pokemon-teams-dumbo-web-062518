class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
    render json: @trainers
  end

  def show
    @trainer = Trainer.find(params[:id])
  end

  def destroy
    @trainers = Trainer.all
    @trainer = Trainer.find(params[:id])
    @trainer.destroy
    render json: @trainers
  end

end
