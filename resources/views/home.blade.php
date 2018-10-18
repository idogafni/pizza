@extends('app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>
                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="/order/create">
                            {{ csrf_field() }}
                            <div class="card-block">
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <label for="name">Pizza Type</label>
                                        <?php
                                            $pizza_types = config('constants.pizza_types');
                                        ?>
                                        <select id="pizza_type" name="pizza_type" class="form-control">
                                            <?php foreach( $pizza_types AS $name => $id ) { ?>
                                                <option value="{{ $id }}">{{ $name }}</option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <label for="name">Addresses</label>
                                        <?php
                                            $addresses = config('constants.delivery_time');
                                        ?>
                                        <select id="address" name="address" class="form-control">
                                            <?php foreach( $addresses AS $street => $time ) { ?>
                                            <option value="{{ $street }}">{{ $street }}</option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="card-block">
                                <div class="form-group">
                                    <div class="col-md-12 ac">
                                        <button type="submit" class="d-flex btn btn-block btn-raised btn-round gradient-blackberry py-2 justify-content-center white">
                                            Make Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
