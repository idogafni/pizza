@extends('app')

@section('content')

  <div class="row" >
    @guest

      <div class="w100alc"><h2>Welcome to {{config('app.name')}}!</h2></div>
      <div class="w100alc"><h4>You can be part of community where you will learn to build thriving online business.</h4></div>

      <div class="w100alc"><h2></h2></div>
      <div class="w100alc">
        <div class="align-center">
          <a href="/register" style="display: inline-block">
            <button class="btn-lg btn-success">Register Now</button>
          </a>
        </div>
      </div>

    @else

    <div class="w100alc"><h2>Grow & Run Your Campaign on Autopilot!</h2></div>
    <div class="w100alc"><h4>You are now part of a community where you will learn to build thriving online business.</h4></div>
    <div class="w100alc"><h4>You are now just moments away from your very first Getting Started lesson!</h4></div>
    <div class="w100alc"><h2></h2></div>
    <div class="w100alc">
      <div class="align-center">
        <a href="/campaigns/create" style="display: inline-block">
          <button class="btn-lg btn-success">Create A Campaign Boost</button>
        </a>
      </div>
    </div>

    @endguest

  </div>

@endsection
