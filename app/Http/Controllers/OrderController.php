<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DateTime;
use App\Jobs\ProcessOrders;
use App\Models\Order;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */

    public function index() {
        $orders = Auth::user()->orders()->get();
        return view('orders.index')->with([
            'orders' => $orders
        ]);
    }

    protected function create(Request $data)
    {
        $user_id = Auth::User()->id;
        $today = new DateTime();
        $order = new Order();
        $order->pizza_id = $data->input('pizza_type');
        $order->address  = $data->input('address');
        $order->user_id  = $user_id;
        $order->created_at = $today->format('Y-m-d H:i:s');
        $order->updated_at = $today->format('Y-m-d H:i:s');
        try {

            $order->save();
            $bake_time = config('constants.pizza_time')[$data->input('pizza_type')];
            ProcessOrders::dispatch($order)->onQueue('orders')->delay(now()->addSecond($bake_time + 6));
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
        return Redirect::to('/orders');
    }
}
