@extends('auth')

@section('content')
<div class="container">
    @if (session('status'))
        <div class="alert alert-success">
            {{ session('status') }}
        </div>
    @endif
    <div class="container-fluid">
        <div class="row full-height-vh">
            <div class="col-12 d-flex align-items-center justify-content-center">
                <div class="card width-400">
                    <div class="card-header align-middle text-center panel-heading font-large-1">
                        <img src="{{ asset('img/logo_c2s_long_black.png')}}" style="max-width: 65%"/>
                    </div>
                    <div class="card-body">
                        <div class="card-block">
                            <h4 class="text-center">Reset Password</h4>
                            <form class="form-horizontal" method="POST" action="{{ route('password.email') }}">
                                {{ csrf_field() }}

                                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                    <label for="email" class="col-12 control-label">E-Mail Address</label>

                                    <div class="col-12">
                                        <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                        @if ($errors->has('email'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-12 ac">
                                        <button type="submit" class="d-flex btn btn-block btn-raised btn-round gradient-blackberry py-2 justify-content-center white">
                                            Send Password Reset Link
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
