<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(['success'=>true,'data'=>User::query()->latest('id')->paginate(50)->through(fn($u)=>$u->makeHidden(['password','remember_token']))->items()]);
    }

    public function store(Request $request)
    {
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255','unique:users,email'],
            'password'=>['required','string','min:8'],
            'role'=>['required','in:client,vendeur,admin'],
        ]);
        $user=User::create([...$data,'password'=>Hash::make($data['password'])]);
        return response()->json(['success'=>true,'data'=>$user],201);
    }

    public function show(string $id){return response()->json(['success'=>true,'data'=>User::findOrFail($id)->makeHidden(['password','remember_token'])]);}

    public function update(Request $request,string $id)
    {
        $user=User::findOrFail($id);
        $data=$request->validate([
            'name'=>['sometimes','string','max:255'],
            'email'=>['sometimes','email','max:255','unique:users,email,'.$id],
            'password'=>['sometimes','nullable','string','min:8'],
            'role'=>['sometimes','in:client,vendeur,admin'],
        ]);
        if(isset($data['password']) && $data['password']) $data['password']=Hash::make($data['password']); else unset($data['password']);
        $user->update($data);
        return response()->json(['success'=>true,'data'=>$user->fresh()->makeHidden(['password','remember_token'])]);
    }

    public function destroy(string $id)
    {
        abort_if((int)$id === auth()->id(),422);
        User::findOrFail($id)->delete();
        return response()->json(['success'=>true]);
    }
}
